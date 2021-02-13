import { ApolloClient, InMemoryCache } from "@apollo/client";
import { __prod__ } from "../constants/constant";

const client = new ApolloClient({
  uri: __prod__
    ? "https://pod-backend.herokuapp.com/graphql"
    : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
