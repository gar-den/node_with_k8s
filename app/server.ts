import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import * as TypeGraphQL from 'type-graphql';
import * as TypeORM from 'typeorm';
import * as http from 'http'
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import compression from 'compression';

import { ServerConfigs } from './configure';
import { UserResolver } from './resolvers/User';

async function initServer() {
  try {
    const db = await TypeORM.createConnection({
      type: 'mysql',
      database: 'test',
      username: 'root',
      password: 'test',
      port: 3306,
      host: 'localhost',
      entities: ServerConfigs.Entities,
      logging: false,
      cache: true,
      dropSchema: false,
      synchronize: false,
      bigNumberStrings: true,
    });

  } catch (err) {
    console.log(err);

    throw new Error(err);
  }

  const schema = await TypeGraphQL.buildSchema({
    emitSchemaFile: false,
    validate: true,
    resolvers: [ UserResolver ]
  })
  
  const app = express();
  const server = new ApolloServer({
    schema,
    validationRules: [ depthLimit(2) ]
  })

  app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Authorization',
      'token',
      'X-Auth-From',
      'X-Real-IP',
      'X-Appengine-User-IP',
      'sentry-trace',
    ],
    credentials: true,
  }))

  app.use(compression())

  await server.start()

  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = http.createServer(app);

  httpServer.listen({ port: 8080 }, () => {
    console.log(`🚀 Server ready and listening at ==> http://localhost:8080/graphql`)
  })
}

initServer();
