import client from "../apollo/path";
import { ApolloProvider } from '@apollo/react-hooks';
import '../styles/globals.scss'
import '../styles/start.scss'
import '../styles/dashboard.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function MyApp({ Component, pageProps }) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </body>
    </html>
  )
}

export default MyApp
