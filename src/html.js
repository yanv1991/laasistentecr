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
        </head>
        <body {...this.props.bodyAttributes}>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `var el=document.getElementsByTagName("body")[0],comment=document.createComment("Begin TradeTracker SuperTag Code");el.appendChild(comment);`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var _TradeTrackerTagOptions = {
                t: 'a',
                s: '350616',
                chk: '74d6a58f5ab56ffcd8d831525781d90c',
                overrideOptions: {}
            };

            (function() {
                var tt = document.createElement('script'),
                    s = document.getElementsByTagName('script')[0];

                tt.setAttribute('type', 'text/javascript');
                tt.setAttribute('src', (document.location.protocol == 'https:' ? 'https' : 'http') + '://tm.tradetracker.net/tag?t=' + _TradeTrackerTagOptions.t + '&amp;s=' + _TradeTrackerTagOptions.s + '&amp;chk=' + _TradeTrackerTagOptions.chk);
                s.parentNode.insertBefore(tt, s);
            })();
            `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `var el=document.getElementsByTagName("body")[0],comment=document.createComment("End TradeTracker SuperTag Code");el.appendChild(comment);`
          }}
        />
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
