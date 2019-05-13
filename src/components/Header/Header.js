import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { NotificationManager } from "react-notifications";

import { ScreenWidthContext, FontLoadedContext } from "../../layouts";
import config from "../../../content/meta/config";
import Menu from "../Menu";
import Overlay from "../Overlay";
import SubscribeForm from "../SubscribeForm";

import avatar from "../../images/jpg/avatar.png";

class Header extends React.Component {
  state = {
    fixed: false,
    email: ""
  };

  visibilitySensorChange = val => {
    if (val) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  };

  getHeaderSize = () => {
    const fixed = this.state.fixed ? "fixed" : "";
    const homepage = this.props.path === "/" ? "homepage" : "";

    return `${fixed} ${homepage}`;
  };

  handleChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    addToMailchimp(this.state.email, this.state)
      .then(({ msg, result }) => {
        if (result !== "success") {
          throw msg;
        }
        this.props.handleClickSubscription();

        NotificationManager.success("Operación exitosa", "Gracias por suscribirte");
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  componentDidUpdate() {
    const body = document.body;

    if (this.props.isSubscribeOpen) {
      body.classList.add("modalOpen");
    } else {
      body.classList.remove("modalOpen");
    }
  }

  render() {
    const { pages, path, theme, handleClickSubscription, isSubscribeOpen } = this.props;
    const { fixed, email } = this.state;

    return (
      <React.Fragment>
        <header className={`header ${this.getHeaderSize()}`}>
          <Link to="/" className="logoType">
            <div className="logo">
              <img
                src={config.gravatarImgMd5 == "" ? avatar : config.gravatarImgMd5}
                alt={config.siteTitle}
              />
            </div>
            <div className="type">
              <h1>{config.headerTitle}</h1>
              <h2>{config.headerSubTitle}</h2>
            </div>
          </Link>
          <FontLoadedContext.Consumer>
            {loaded => (
              <ScreenWidthContext.Consumer>
                {width => (
                  <Menu
                    path={path}
                    fixed={fixed}
                    screenWidth={width}
                    fontLoaded={loaded}
                    pages={pages}
                    theme={theme}
                  />
                )}
              </ScreenWidthContext.Consumer>
            )}
          </FontLoadedContext.Consumer>
          <Overlay open={isSubscribeOpen} onClose={handleClickSubscription}>
            <h1 className="title">Suscribirte a {config.headerTitle}</h1>
            <p className="description">
              ¡Estar al día! Obtenga las últimas noticias y promociones enviadas directamente a tu
              bandeja de entrada.
            </p>
            <SubscribeForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              value={email}
            />
          </Overlay>
        </header>
        <VisibilitySensor onChange={this.visibilitySensorChange}>
          <div className="sensor" />
        </VisibilitySensor>

        {/* --- STYLES --- */}
        <style jsx>{`
          .header {
            align-items: center;
            justify-content: center;
            background-color: ${theme.color.neutral.white};
            display: flex;
            height: ${theme.header.height.default};
            position: relative;
            top: 0;
            width: 100%;
            align-items: center;

            :global(a.logoType) {
              align-items: center;
              display: flex;
              flex-direction: "column";
              color: ${theme.text.color.primary};

              .logo {
                flex-shrink: 0;
                background-color: white;
              }
            }

            &.homepage {
              position: absolute;
              background-color: transparent;
              height: ${theme.header.height.homepage};
            }
          }

          h1 {
            font-size: ${theme.font.size.m};
            font-weight: ${theme.font.weight.standard};
            margin: ${theme.space.stack.xs};
          }

          h2 {
            font-weight: ${theme.font.weight.standard};
            font-size: ${theme.font.size.xxs};
            letter-spacing: 0;
            margin: 0;
          }

          .logo {
            border-radius: 75% 75%;
            border: 1px solid #eee;
            display: inline-block;
            height: 44px;
            margin: 0 20px;
            overflow: hidden;
            width: 44px;
            transition: all 0.5s;

            &.logoOverlay {
              position: fixed;
              top: 23px;
              left: 30px;
            }

            .homepage & {
              height: 60px;
              width: 60px;
            }

            img {
              width: 100%;
            }
          }

          .title {
            display: inline-block;
            margin: 0 0 10px 0;
            font-size: 3rem;
            line-height: 1.15em;
          }

          .description {
            margin: 0 auto 50px;
            max-width: 650px;
            font-size: 1.5rem;
            line-height: 1.3em;
            font-weight: 300;
            opacity: 0.8;
          }

          @from-width tablet {
            .title {
              fon-size: 4rem;
            }

            .description {
              font-size: 2rem;
            }
          }

          .sensor {
            display: block;
            position: absolute;
            bottom: 0;
            z-index: 1;
            left: 0;
            right: 0;
            height: 1px;
            top: ${path === "/" ? theme.header.height.homepage : theme.header.height.default};
          }

          @from-width tablet {
            .header {
              padding: ${theme.space.inset.l};

              .logo {
                margin: ${theme.space.inline.default};
              }

              &.homepage {
                height: ${theme.header.height.homepage};
              }
            }
          }

          @below desktop {
            .header.homepage {
              .logo {
                border: none;
              }

              :global(a.logoType),
              h1 {
                color: ${theme.color.neutral.white};
              }
              h2 {
                color: ${theme.color.neutral.gray.d};
              }
            }
          }

          @from-width desktop {
            .header {
              align-items: center;
              background-color: ${theme.color.neutral.white};
              display: flex;
              position: absolute;
              top: 0;
              width: 100%;
              justify-content: space-between;
              transition: padding 0.5s;

              &.fixed {
                height: ${theme.header.height.fixed};
                background-color: ${theme.color.neutral.white};
                left: 0;
                padding: 0 ${theme.space.m};
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1;

                h1 {
                  margin: ${theme.space.stack.xxs};
                }

                h2 {
                  display: none;
                }
              }

              &.homepage:not(.fixed) {
                :global(a.logoType),
                h1 {
                  color: ${theme.color.neutral.white};
                }
                h2 {
                  color: ${theme.color.neutral.gray.d};
                }
              }
            }

            .header :global(a.logoType) {
              text-align: left;
              flex-direction: row;
              flex-shrink: 0;
              width: auto;
            }

            .logo {
              margin: ${theme.space.inline.default};

              .fixed & {
                height: 36px;
                width: 36px;
              }

              .header.homepage:not(.fixed) & {
                border: none;
              }
            }

            h2 {
              animation-duration: ${theme.time.duration.default};
              animation-name: h2Entry;
            }

            @keyframes h2Entry {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  isSubscribeOpen: PropTypes.bool,
  handleClickSubscription: PropTypes.func
};

export default Header;
