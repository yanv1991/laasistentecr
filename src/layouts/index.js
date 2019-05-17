import "typeface-open-sans";
import FontFaceObserver from "fontfaceobserver";
import PropTypes from "prop-types";
import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { NotificationContainer } from "react-notifications";
import { BackTop } from "antd";
import "antd/lib/back-top/style/index.css";

import { getScreenWidth, timeoutThrottlerHandler } from "../utils/helpers";
import Footer from "../components/Footer/";
import Header from "../components/Header";
import Sticky from "../components/Sticky";

export const ThemeContext = React.createContext(null);
export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);
export const SubscribeContext = React.createContext({ isOpen: false, toggleSubscribe: () => {} });

import themeObjectFromYaml from "../theme/theme.yaml";

class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      font400loaded: false,
      font600loaded: false,
      screenWidth: 0,
      headerMinimized: false,
      theme: themeObjectFromYaml,
      isSubscribeOpen: false
    };

    if (typeof window !== `undefined`) {
      this.loadFont("font400", "Open Sans", 400);
      this.loadFont("font600", "Open Sans", 600);
    }
  }

  timeouts = {};

  componentDidMount() {
    this.setState({
      screenWidth: getScreenWidth()
    });
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 100, this.resizeHandler);
  };

  resizeHandler = () => {
    this.setState({ screenWidth: getScreenWidth() });
  };

  isHomePage = () => {
    if (this.props.location.pathname === "/") {
      return true;
    }

    return false;
  };

  loadFont = (name, family, weight) => {
    const font = new FontFaceObserver(family, {
      weight: weight
    });

    font.load().then(
      () => {
        console.log(`${name} is available`);
        this.setState({ [`${name}loaded`]: true });
      },
      () => {
        console.log(`${name} is not available`);
      }
    );
  };

  handleOnClick = () => {
    this.setState(prevState => {
      return { ...prevState, isSubscribeOpen: !prevState.isSubscribeOpen };
    });
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            pages: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
              sort: { fields: [fields___prefix], order: ASC }
            ) {
              edges {
                node {
                  fields {
                    slug
                    prefix
                  }
                  frontmatter {
                    title
                    ## menuTitle
                  }
                }
              }
            }
            footnote: markdownRemark(fileAbsolutePath: { regex: "/footnote/" }) {
              id
              html
            }
            site {
              siteMetadata {
                facebook {
                  appId
                }
              }
            }
          }
        `}
        render={data => {
          const { children, pageContext, location: { pathname }} = this.props;
          const {
            footnote: { html: footnoteHTML },
            pages: { edges: pages }
          } = data;
          const { slug, source } = pageContext;
          const { screenWidth, theme } = this.state;
          const isOfertas = slug === "/ofertas/";
          const isDesktop = screenWidth >= 1024;
          const showAside = isOfertas && isDesktop;
          const mobileDeals = isOfertas && !isDesktop;
          const isPost = source === "posts" && isDesktop;
          const parsedPath = pathname.replace(/\//g, "");
          const isSubscribe = "subscribe" === parsedPath && !isDesktop;
          let bannerId = 1779274;

          if (isDesktop) {
            bannerId = 1779265;
          } else if (screenWidth >= 468) {
            bannerId = 1779275;
          }

          return (
            <ThemeContext.Provider value={theme}>
              <FontLoadedContext.Provider value={this.state.font400loaded}>
                <ScreenWidthContext.Provider value={screenWidth}>
                  <SubscribeContext.Provider
                    value={{
                      isOpen: this.state.isSubscribeOpen,
                      toggleSubscribe: this.handleOnClick
                    }}
                  >
                    <React.Fragment>
                      <NotificationContainer />
                      {parsedPath !== "subscribe" && <Sticky />}
                      <BackTop />
                      <Header
                        path={this.props.location.pathname}
                        pages={pages}
                        theme={this.state.theme}
                        isSubscribeOpen={this.state.isSubscribeOpen}
                        handleClickSubscription={this.handleOnClick}
                      />
                      <div className="mainContainer">
                        <aside className={`${showAside || isPost ? "" : "hide"}`}>
                          <iframe
                            scrolling="no"
                            width=""
                            height="475"
                            frameBorder="0"
                            src="//www.travelpayouts.com/widgets/d1b92f2b86738762bdbe044a5ddce7bc.html?v=1702"
                          />
                        </aside>
                        <main>{children}</main>
                        <aside className={`${showAside || isPost ? "" : "hide"}`}>
                          <a
                            target="_blank"
                            href="https://shareasale.com/r.cfm?b=845324&amp;u=2080537&amp;m=32794&amp;urllink=&amp;afftrack="
                          >
                            <img
                              src="https://static.shareasale.com/image/32794/a_01.jpg"
                              border="0"
                              alt="Parque Xoximilco, paga 4 adultos y el 5to es gratis. Musica en vivo, tequila y más. Cancun, Riviera Maya."
                            />
                          </a>
                        </aside>
                      </div>
                      <div className={`banner ${isOfertas ? "hide" : ""}`}>
                        <ins
                          className="bookingaff"
                          data-aid={bannerId}
                          data-target_aid={bannerId}
                          data-prod="banner"
                          data-height="100%"
                          data-lang="es"
                          data-width="100%"
                        >
                          <a href={`//www.booking.com?aid=${bannerId}`}>Booking.com</a>
                        </ins>
                      </div>
                      <div className={`bookingBanner ${showAside ? "" : "hide"}`}>
                        <ins
                          className="bookingaff"
                          data-aid="1779292"
                          data-target_aid="1779292"
                          data-prod="sbp"
                          data-width="700"
                          data-height="250"
                          data-lang="es"
                          data-currency="USD"
                          data-df_num_properties="3"
                        >
                          <a href="//www.booking.com?aid=1779292">Booking.com</a>
                        </ins>
                      </div>
                      <div className={`bookingBanner ${mobileDeals || isSubscribe ? "" : "hide"}`}>
                        <iframe
                          scrolling="no"
                          width=""
                          height="475"
                          frameBorder="0"
                          src="//www.travelpayouts.com/widgets/d1b92f2b86738762bdbe044a5ddce7bc.html?v=1702"
                        />
                      </div>
                      <div className={`deals ${mobileDeals ? "" : "hide"}`}>
                        <a
                          target="_blank"
                          href="https://shareasale.com/r.cfm?b=695583&amp;u=2080537&amp;m=32794&amp;urllink=&amp;afftrack="
                        >
                          <img
                            src="https://static.shareasale.com/image/32794/plantillas-banners-web_afiliados--300_00.jpg"
                            border="0"
                            alt="Parque Xcaret una exposicion de colores, sabores y tradiciones mexicanas. Atracciones para toda la familia. Cancun, México"
                          />
                        </a>
                      </div>
                      <Footer html={footnoteHTML} theme={this.state.theme} />

                      {/* --- STYLES --- */}
                      <style jsx>{`
                        .mainContainer {
                          display: flex;
                          justify-content: flex-end;
                        }
                        main {
                          min-height: 80vh;
                          flex: 2;
                        }

                        .bookingBanner {
                          margin: 0 auto;
                          max-width: 300px;
                        }

                        aside {
                          flex: 1;
                          padding: ${theme.space.inset.default};
                          display: flex;
                          justify-content: center;
                        }

                        .feedback {
                          position: absolute;
                          top: 11.5%;
                          left: 0;
                          background: green;
                          width: 150px;
                          height: 45px;
                          color: red;
                          z-index: 9;
                          display: inline-block;
                          transform: rotate(270deg);
                          font-size: 24px;
                          font-weight: 900;
                          text-align: center;
                          line-height: 45px;
                          border-radius: 0px 0px 4px 4px;
                        }

                        .banner,
                        .deals {
                          max-width: 300px;
                          margin: 0 auto;
                          position: relative;
                          height: 250px;
                          overflow: hidden;
                          margin-bottom: 0.4rem;

                          ins {
                            iframe {
                              position: absolute;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 100%;
                            }
                          }
                        }

                        @from-width 468px {
                          .banner {
                            max-width: 468px;
                            height: 60px;
                          }
                        }

                        @from-width tablet {
                          aside {
                            padding: ${`calc(${theme.space.default}) calc(${
                              theme.space.default
                            } * 2)`};
                          }

                          .bookingBanner {
                            display: flex;
                            justify-content: center;
                          }
                        }

                        @from-width desktop {
                          aside {
                            padding: ${`calc(${theme.space.default} * 2 + 90px) 0 calc(${
                              theme.space.default
                            } * 2)`};
                            max-width: ${theme.text.maxWidth.desktop};
                          }

                          .banner {
                            max-width: 728px;
                            height: 90px;
                          }

                          .bookingBanner {
                            max-width: 700px;
                            height: 250px;
                          }
                        }

                        .deals {
                          height: auto;
                        }

                        .hide {
                          display: none;
                        }
                      `}</style>
                      <style jsx global>{`
                        html {
                          box-sizing: border-box;
                        }
                        *,
                        *:after,
                        *:before {
                          box-sizing: inherit;
                          margin: 0;
                          padding: 0;
                        }
                        body {
                          font-family: ${this.state.font400loaded
                            ? "'Open Sans', sans-serif;"
                            : "Arial, sans-serif;"};
                        }
                        .modalOpen {
                          overflow: hidden;
                        }
                        h1,
                        h2,
                        h3 {
                          font-weight: ${this.state.font600loaded ? 600 : 400};
                          line-height: 1.1;
                          letter-spacing: -0.03em;
                          margin: 0;
                        }
                        h1 {
                          letter-spacing: -0.04em;
                        }
                        p {
                          margin: 0;
                        }
                        strong {
                          font-weight: ${this.state.font600loaded ? 600 : 400};
                        }
                        a {
                          text-decoration: none;
                          color: #666;
                        }
                        main {
                          width: auto;
                          display: block;
                        }
                      `}</style>
                    </React.Fragment>
                  </SubscribeContext.Provider>
                </ScreenWidthContext.Provider>
              </FontLoadedContext.Provider>
            </ThemeContext.Provider>
          );
        }}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object,
  location: PropTypes.object.isRequired
};

export default Layout;
