import { AppProps } from "next/dist/next-server/lib/router/router";
import { ApolloProvider } from "@apollo/client";

// Lib
import { useApollo } from "../lib/apolloClient";

// Styles
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
