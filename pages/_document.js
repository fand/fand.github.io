import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <title>gmork.in</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:site" content="@amagitakayosi"/>
          <meta property="og:title" content="gmork.in"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://gmork.in/"/>
          <meta property="og:image" content="/static/images/vertigo.png"/>
          <meta property="og:description" content="Portfolio of @amagitakayosi"/>
          <link rel="apple-touch-icon" sizes="57x57" href="/static/images/favicon/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/images/favicon/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/static/images/favicon/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/images/favicon/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/static/images/favicon/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/static/images/favicon/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/static/images/favicon/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/static/images/favicon/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicon/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/static/images/favicon/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/static/images/favicon/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/static/images/favicon/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
          {this.props.styleTags}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/5.0.0/sanitize.min.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,700"/>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://use.fontawesome.com/9f93baf7cc.js"></script>
          <script dangerouslySetInnerHTML={{ __html: `
            !function(g,m,o,r,k){g.GoogleAnalyticsObject=o;g[o]||(g[o]=function(){
            (g[o].q=g[o].q||[]).push(arguments)});g[o].l=+new Date;r=m.createElement('script');
            k=m.scripts[0];r.src='//www.google-analytics.com/analytics.js';
            k.parentNode.insertBefore(r,k)}(window,document,'ga');
                      ga('create', 'UA-41787635-13', 'auto');
            ga('send', 'pageview');
          ` }}/>
        </body>
      </html>
    )
  }
}
