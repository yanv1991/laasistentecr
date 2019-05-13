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
          const { children } = this.props;
          const {
            footnote: { html: footnoteHTML },
            pages: { edges: pages }
          } = data;

          return (
            <ThemeContext.Provider value={this.state.theme}>
              <FontLoadedContext.Provider value={this.state.font400loaded}>
                <ScreenWidthContext.Provider value={this.state.screenWidth}>
                  <SubscribeContext.Provider
                    value={{
                      isOpen: this.state.isSubscribeOpen,
                      toggleSubscribe: this.handleOnClick
                    }}
                  >
                    <React.Fragment>
                      <NotificationContainer />
                      {this.props.location.pathname !== "/subscribe" && <Sticky />}
                      <BackTop />
                      <Header
                        path={this.props.location.pathname}
                        pages={pages}
                        theme={this.state.theme}
                        isSubscribeOpen={this.state.isSubscribeOpen}
                        handleClickSubscription={this.handleOnClick}
                      />
                      <main>{children}</main>
                      <Footer html={footnoteHTML} theme={this.state.theme} />

                      {/* --- STYLES --- */}
                      <style jsx>{`
                        main {
                          min-height: 80vh;
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
