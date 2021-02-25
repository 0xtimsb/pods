import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BaseStyles } from "@primer/components";

// Apollo client
import client from "./lib/apolloClient";

// Components
import App from "./components/App";

const Index = () => {
  return (
    <ApolloProvider client={client}>
      <BaseStyles>
        <App />
      </BaseStyles>
    </ApolloProvider>
  );
};

render(<Index />, document.getElementById("root"));
