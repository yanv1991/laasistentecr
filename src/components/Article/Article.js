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
          <iframe
            scrolling="no"
            width="700"
            height="215"
            frameBorder="0"
            src="//www.travelpayouts.com/widgets/d1b92f2b86738762bdbe044a5ddce7bc.html?v=1739"
          />
        )}
      </article>

      {/* --- STYLES --- */}
      <style jsx>{`
        .article {
          padding: ${theme.space.inset.default};
          margin: 0 auto;
        }
        @from-width tablet {
          .article {
            padding: ${`calc(${theme.space.default}) calc(${theme.space.default} * 2)`};
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @from-width desktop {
          .article {
            padding: ${`calc(${theme.space.default} * 2 + 90px) 0 calc(${
              theme.space.default
            } * 2)`};
            max-width: ${theme.text.maxWidth.desktop};
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
