import { AppProps } from "next/dist/next-server/lib/router/router";
import { ApolloProvider } from "@apollo/client";

// Lib
import { useApollo } from "../lib/apolloClient";

// Components
import Layout from "../components/Layout";

// Styles
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
