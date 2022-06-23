import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import * as TypeGraphQL from 'type-graphql';
import * as TypeORM from 'typeorm';
import * as http from 'http'

import cors from 'cors';
import compression from 'compression';
import "reflect-metadata";

import { ServerConfigs } from './configure';
import { UserResolver } from './resolvers/User';
import depthLimit from 'graphql-depth-limit';

export let server: ApolloServer

export async function initServer() {
  try {
    let host = 'localhost'
    let port = 3306

    if (process.env.ENV === 'dev') {
      host = "server_test_mysql"
    }

    await TypeORM.createConnection({
      type: 'mysql',
      database: 'test',
      username: 'root',
      password: 'test',
      port,
      host,
      entities: ServerConfigs.Entities,
      logging: false,
      cache: true,
      dropSchema: false,
      synchronize: false,
      bigNumberStrings: true,
    });
  } catch (err) {
    console.log(err);

    throw err;
  }

  const schema = await TypeGraphQL.buildSchema({
    emitSchemaFile: false,
    validate: true,
    resolvers: [ UserResolver ]
  })
  
  const app = express();
  server = new ApolloServer({
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

  const port = process.env.ENV === 'test' ? 8081 : 8080

  httpServer.listen({ port }, () => {
    console.log(`ENV=(${process.env.ENV}), Server listening on port ${port}`)
    console.log(`🚀 Server ready and listening at ==> http://localhost:${[port]}/graphql`)
  })
}

if (process.env.ENV !== 'test') {
  initServer();
}
