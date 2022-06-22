import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import { Express } from 'express'
import { EntitySchema } from 'typeorm';

import { User } from './entities/User';
import { UserResolver } from './resolvers/User';
import { NonEmptyArray } from 'type-graphql';

declare interface IServerOptions {

}

type TypeGraphQLResolverAcceptable = NonEmptyArray<Function> | NonEmptyArray<string>
type TypeORMEntityAcceptable = Function | string | EntitySchema<any>

declare interface IServerConfig {
  Resolver: TypeGraphQLResolverAcceptable[],
  Entities: TypeORMEntityAcceptable[],
  configureExpress?: (express: Express, serverOptions: IServerOptions) => Promise<void>
}

export const ServerConfigs: IServerConfig = {
  Resolver: [
    [UserResolver],
  ],
  Entities: [
    User
  ],
  configureExpress: async (app: any, options: any) => {
    if (options.MORGAN) {
      app.use(morgan(options.MORGAN))
    }
    app.use(bodyParser.json())
  },
}