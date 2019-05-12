import React from "react";
import PropTypes from "prop-types";

import { ScreenWidthContext } from "../../layouts";

const HIDE_SEARCH_LIST = ["/acerca/", "/privacidad/", "/ofertas/"];

export default class Article extends React.Component {
  render() {
    const { children, theme, slug } = this.props;

    return (
      <React.Fragment>
        <ScreenWidthContext.Consumer>
          {width => {
            const dealType = width >= 1024 ? "brickwork" : "slider";

            return (
              <article className="article">
                {children}
                {
                  <React.Fragment>
                    {!HIDE_SEARCH_LIST.includes(slug) && (
                      <div className="embed-container">
                        <iframe
                          scrolling="no"
                          width=""
                          height="215"
                          frameBorder="0"
                          src="//www.travelpayouts.com/widgets/d1b92f2b86738762bdbe044a5ddce7bc.html?v=1739"
                        />
                      </div>
                    )}
                    {slug === "/ofertas/" && (
                      <div className="embed-container deals">
                        <iframe
                          scrolling="no"
                          width=""
                          height="300"
                          frameBorder="0"
                          src={`//www.travelpayouts.com/ducklett/iframe.html?widget_type=${dealType}&currency=usd&host=search.jetradar.com&marker=225301.&limit=9&powered_by=true&origin_iatas=SJO`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                }
              </article>
            );
          }}
        </ScreenWidthContext.Consumer>
        {/* --- STYLES --- */}
        <style jsx>{`
          .article {
            padding: ${theme.space.inset.default};
            margin: 0 auto;

            .embed-container {
              position: relative;
              padding-bottom: 169.5%;
              height: 0;
              overflow: hidden;

              iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }

            .deals {
              padding-bottom: 0;
              height: 300px;
            }
          }
          @from-width 375px {
            .article {
              .embed-container {
                padding-bottom: 119.5%;
              }

              .deals {
                padding-bottom: 0;
              }
            }
          }

          @from-width tablet {
            .article {
              padding: ${`calc(${theme.space.default}) calc(${theme.space.default} * 2)`};
              max-width: ${theme.text.maxWidth.tablet};

              .embed-container {
                padding-bottom: 50.25%;
              }
            }
          }
          @from-width desktop {
            .article {
              padding: ${`calc(${theme.space.default} * 2 + 90px) 0 calc(${
                theme.space.default
              } * 2)`};
              max-width: ${theme.text.maxWidth.desktop};

              .embed-container {
                padding-bottom: 31.25%;

                iframe {
                  width: 103%;
                }
              }

              .deals {
                padding-bottom: 37.25%;
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  slug: PropTypes.string
};
