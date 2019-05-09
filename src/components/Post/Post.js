import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Button from "antd/lib/button";

import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import Comments from "./Comments";
import NextPrev from "./NextPrev";

import { SubscribeContext } from "../../layouts";

const Share = asyncComponent(() =>
  import("./Share")
    .then(module => {
      return module.default;
    })
    .catch(error => {})
);

const Post = props => {
  const {
    post,
    post: {
      html,
      fields: { prefix, slug },
      frontmatter: { title, author, category }
    },
    authornote,
    facebook,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;

  return (
    <React.Fragment>
      <SubscribeContext.Consumer>
        {({ toggleSubscribe }) => (
          <React.Fragment>
            <header>
              <Headline title={title} theme={theme} />
              <Meta prefix={prefix} author={author} category={category} theme={theme} />
            </header>
            <Bodytext html={html} theme={theme} />
            <footer>
              <div className="container">
                <Share post={post} theme={theme} />
                <div className="subscribe">
                  <Button onClick={toggleSubscribe} type="primary">
                    SUSCRIBIRTE
                  </Button>
                </div>
              </div>
              <Author note={authornote} theme={theme} />
              <NextPrev next={nextPost} prev={prevPost} theme={theme} />
              <Comments slug={slug} facebook={facebook} theme={theme} />
            </footer>
          </React.Fragment>
        )}
      </SubscribeContext.Consumer>
      {/* --- STYLES --- */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          :global(button) {
            margin: 1rem 0;
          }
        }

        @from-width tablet {
          .container {
            flex-direction: row;
            justify-content: space-around;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default Post;
