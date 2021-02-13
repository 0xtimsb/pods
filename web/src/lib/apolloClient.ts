import { ApolloClient, InMemoryCache } from "@apollo/client";
import { __prod__ } from "../constants/constant";

const client = new ApolloClient({
  uri: __prod__
    ? process.env.REACT_APP_SERVER
    : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
