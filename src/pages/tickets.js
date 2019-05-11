import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const Tiquetes = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Tiquetes y Hospedaje" theme={theme} />
            </header>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

Tiquetes.propTypes = {
  data: PropTypes.object.isRequired
};

export default Tiquetes;

//eslint-disable-next-line no-undef
export const query = graphql`
  query TiquetesQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
