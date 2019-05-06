import React from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "../layouts";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const Sucess = props => {
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
          <React.Fragment>
            <div className="content">
              <header>
                <Headline title="Gracias." theme={theme} />
              </header>
              <p>Responderemos tu mensaje lo mas pronto posible.</p>
            </div>
            {/* --- STYLES --- */}
            <style jsx>{`
              .content {
                padding: ${theme.space.inset.default};
                margin: 0 auto;
              }

              @from-width tablet {
                .content {
                  padding: ${`calc(${theme.space.default}) calc(${theme.space.default} * 2)`};
                  max-width: ${theme.text.maxWidth.tablet};
                }
              }
              @from-width desktop {
                .content {
                  padding: ${`calc(${theme.space.default} * 2 + 90px) 0 calc(${
                    theme.space.default
                  } * 2)`};
                  max-width: ${theme.text.maxWidth.desktop};
                }
              }
            `}</style>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

Sucess.propTypes = {
  data: PropTypes.object.isRequired
};

export default Sucess;

//eslint-disable-next-line no-undef
export const query = graphql`
  query SuccessQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
