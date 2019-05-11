import React from "react";
import PropTypes from "prop-types";

const HIDE_SEARCH_LIST = ["/acerca/", "/privacidad/"];

const Article = props => {
  const { children, theme, slug } = props;

  return (
    <React.Fragment>
      <article className="article">
        {children}
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
      </article>

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
        }
        @from-width 375px {
          .article {
            .embed-container {
              padding-bottom: 119.5%;
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
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Article.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  slug: PropTypes.string
};

export default Article;
