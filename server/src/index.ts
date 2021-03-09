import "reflect-metadata";
import "dotenv/config";

import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import { createConnection } from "typeorm";

import { buildSchema } from "type-graphql";
import path from "path";

import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";

import { RedisPubSub } from "graphql-redis-subscriptions";

// Constants
import { __prod__ } from "./constants";

// Resolvers
import { UserResolver } from "./resolvers/user-resolver";
import { PodResolver } from "./resolvers/pod-resolver";
import { StoryResolver } from "./resolvers/story-resolver";
import { TaskResolver } from "./resolvers/task-resolver";
import { MessageResolver } from "./resolvers/message-resolver";

// Middleware
import { authMiddleware } from "./middleware/auth-middleware";
import { InviteResolver } from "./resolvers/invite-resolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    logging: false,
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  const pubSub = new RedisPubSub({
    publisher: new Redis(process.env.REDIS_URL),
    subscriber: new Redis(process.env.REDIS_URL),
  });

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      PodResolver,
      StoryResolver,
      TaskResolver,
      MessageResolver,
      InviteResolver,
    ],
    //  emitSchemaFile: path.resolve(__dirname, "schema.gql"),  // To emit schema file
    validate: false,
    pubSub,
    authChecker: authMiddleware,
    authMode: "null",
  });

  const app = express();

  if (__prod__) {
    app.set("trust proxy", 1); // trust first proxy
  }

  const RedisStore = connectRedis(session);

  const redis = new Redis(process.env.REDIS_URL);

  const sessionMiddleware = session({
    store: new RedisStore({
      client: redis,
      disableTouch: true, // To store data and extra calls
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      sameSite: __prod__ ? "none" : "lax", // "none" works with heroku domain. If you want to use "lax", you need custom domain.
      secure: __prod__, // Cookie only works in https.
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  });

  app.use(sessionMiddleware);

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res, connection }) => ({ req, res, redis, connection }),
    subscriptions: {
      onConnect: (_, ws: any) => {
        console.log("Client connected");
        return new Promise((res) =>
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            res({ req: ws.upgradeReq });
          })
        );
      },
      onDisconnect: () => {
        console.log("Client disconnected");
      },
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  const port = process.env.PORT || 4000;

  httpServer.listen(port, () =>
    console.log(`Running: http://localhost:${port}/graphql`)
  );
};

main().catch((err) => console.error(err));
