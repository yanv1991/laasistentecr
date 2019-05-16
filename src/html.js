import React from "react";
import PropTypes from "prop-types";

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          {this.props.headComponents}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#D0E0D8" />
          <meta name="apple-mobile-web-app-title" content="Lazywill" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-57x57.png" sizes="57x57" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-60x60.png" sizes="60x60" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-72x72.png" sizes="72x72" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-76x76.png" sizes="76x76" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-114x114.png" sizes="114x114" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-120x120.png" sizes="120x120" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-144x144.png" sizes="144x144" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-152x152.png" sizes="152x152" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" sizes="180x180" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
          <link rel="stylesheet" type="text/css" href="/css/react-notifications.css" />
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(window.adsbygoogle = window.adsbygoogle || []).push({google_ad_client: 'ca-pub-9017701188036910', enable_page_level_ads: true});"
            }}
          />
          <script
            defer
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              function createDL(t){var e=[],s=[];return e.push=function(){return this.length>=t?!!s[1]&&(this.splice(s[0],s[1]),s.splice(1,1),this.push.apply(this,arguments)):(this.constructor.prototype.push.apply(this,arguments),s.push(arguments.length),this)},e}!function(t,e,s,n,r){t[n]=t[n]||createDL(3),t[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var a=e.getElementsByTagName(s)[0],i=e.createElement(s);i.async=!0,i.src="https://www.googletagmanager.com/gtm.js?id=GTM-PPDMNV5",a.parentNode.insertBefore(i,a)}(window,document,"script","dataLayer");
              `
            }}
          />
        </head>
        <body {...this.props.bodyAttributes}>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-PPDMNV5"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              >
              </iframe>
              `
            }}
          />
          {this.props.preBodyComponents}
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(d, sc, u) {
                  var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0];
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = u + '?v=' + (+new Date());
                  p.parentNode.insertBefore(s,p);
                })(document, 'script', '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js');`
            }}
          />
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
