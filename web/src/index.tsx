import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";

// Components
import App from "./components/App";

// Apollo client
import client from "./lib/apolloClient";

// Styles
import "./styles/index.css";

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
