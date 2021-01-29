import "reflect-metadata";
import "dotenv/config";

import express from "express";
import { ApolloServer } from "apollo-server-express";

import { createConnection } from "typeorm";

import { buildSchema } from "type-graphql";
import path from "path";

// Resolvers
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    logging: true,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  const schema = await buildSchema({
    resolvers: [UserResolver],
    //  emitSchemaFile: path.resolve(__dirname, "schema.gql"),  // To emit schema file
  });

  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(parseInt(process.env.PORT), () =>
    console.log(
      `Running: http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
};

main().catch((err) => console.error(err));
