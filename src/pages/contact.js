import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Contact from "../components/Contact";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const ContactPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    },
    location,
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme} slug={location.pathname}>
            <header>
              <Headline title="Contacto" theme={theme} />
            </header>
            <Contact theme={theme} />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ContactPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
