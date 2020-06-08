import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import config from "../../../content/meta/config";

const Seo = props => {
  const { data, facebook } = props;
  const postTitle = ((data || {}).frontmatter || {}).title;
  const postDescription = ((data || {}).frontmatter || {}).description;
  // const postCover = ((data || {}).frontmatter || {}).cover;
  const postSlug = ((data || {}).fields || {}).slug || "";
  const category = data && data.frontmatter && data.frontmatter.category;
  const contentImage =
    data &&
    data.frontmatter &&
    data.frontmatter.cover &&
    data.frontmatter.cover.childImageSharp &&
    data.frontmatter.cover.childImageSharp.resize &&
    data.frontmatter.cover.childImageSharp.resize.src;

  const title = postTitle ? `${postTitle} - ${config.shortSiteTitle}` : config.siteTitle;
  const description = postDescription ? postDescription : config.siteDescription;
  const image = config.siteImage;
  const url = config.siteUrl + config.pathPrefix + postSlug;

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: "og: http://ogp.me/ns#"
      }}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={category || description} />
      <meta property="og:image" content={`https://laasistentecr.com${contentImage || image}`} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="147" />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content={facebook.appId} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.authorTwitterAccount ? config.authorTwitterAccount : ""}
      />
    </Helmet>
  );
};

Seo.propTypes = {
  data: PropTypes.object,
  facebook: PropTypes.object.isRequired
};

export default Seo;
