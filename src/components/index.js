import Helmet from 'react-helmet'
import Markdown from 'react-markdown';
import Works from './works';

export default () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Gmork</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@amagitakayosi"/>
      <meta property="og:title" content="GM"/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="http://gmork.in/"/>
      <meta property="og:image" content="/static/og_image.png"/>
      <meta property="og:description" content=""/>
      <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/180.png"/>
      <link rel="apple-touch-icon-precomposed" href="/static/icons/180.png"/>
      <link rel="shortcut icon" href="/static/icons/192.png"/>
      <link rel="icon" sizes="192x192" href="/static/icons/192.png"/>
      <link rel="icon" type="image/png" href="/static/icons/192.png" sizes="192x192"/>
      <meta name="theme-color" content="#ffffff"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/5.0.0/sanitize.min.css"/>
    </Helmet>

    <h1>gmork.in</h1>

    <Works/>

  </div>
)
