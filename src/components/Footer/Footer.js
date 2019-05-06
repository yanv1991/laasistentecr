import React from "react";
import PropTypes from "prop-types";
import { InlineFollowButtons } from "sharethis-reactjs";

const Footer = props => {
  const { html, theme } = props;

  return (
    <React.Fragment>
      <footer className="footer" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="social">
        <InlineFollowButtons
          config={{
            action: "", // call to action (STRING)
            action_enable: true, // show/hide call to action (true, false)
            action_pos: "bottom", // position of call to action (left, top, right)
            alignment: "center", // alignment of buttons (left, center, right)
            enabled: true, // show/hide buttons (true, false)
            networks: [
              // which networks to include (see FOLLOW NETWORKS)
              "twitter",
              "facebook",
              "instagram"
            ],
            padding: 8, // padding within buttons (INTEGER)
            profiles: {
              // social profile links for buttons
              twitter: "laasistentecr",
              facebook: "laasistentecr",
              instagram: "laasistentecr"
            },
            radius: 9, // the corner radius on each button (INTEGER)
            size: 32, // the size of each button (INTEGER)
            spacing: 8 // the spacing between buttons (INTEGER)
          }}
        />
      </div>
      {/* --- STYLES --- */}
      <style jsx>{`
        .footer {
          background: ${theme.color.neutral.white};
          padding: ${theme.space.inset.default};
          padding-top: 0;

          :global(ul) {
            list-style: none;
            text-align: center;
            padding: 0;

            :global(li) {
              color: ${theme.color.neutral.gray.g};
              font-size: ${theme.font.size.xxs};
              padding: ${theme.space.xxs} ${theme.space.s};
              position: relative;
              display: inline-block;

              &::after {
                content: "•";
                position: absolute;
                right: ${`calc(${theme.space.xs} * -1)`};
              }
              &:last-child::after {
                content: "";
              }
            }
          }
        }

        .social {
          padding: 0 0 7rem 0;
        }

        @from-width desktop {
          .social {
            padding: 0 1em 1.5em;
            :global(span) {
              color: ${theme.color.neutral.gray.g};
              font-size: ${theme.font.size.xxs};
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Footer.propTypes = {
  html: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default Footer;
