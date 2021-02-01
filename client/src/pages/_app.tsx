import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />{" "}
    </ApolloProvider>
  );
}

export default MyApp;
