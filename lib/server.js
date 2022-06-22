"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const TypeGraphQL = __importStar(require("type-graphql"));
const TypeORM = __importStar(require("typeorm"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
require("reflect-metadata");
const configure_1 = require("./configure");
const User_1 = require("./resolvers/User");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
async function initServer() {
    try {
        await TypeORM.createConnection({
            type: 'mysql',
            database: 'test',
            username: 'root',
            password: 'test',
            port: 3306,
            host: 'localhost',
            entities: configure_1.ServerConfigs.Entities,
            logging: false,
            cache: true,
            dropSchema: false,
            synchronize: false,
            bigNumberStrings: true,
        });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    const schema = await TypeGraphQL.buildSchema({
        emitSchemaFile: false,
        validate: true,
        resolvers: [User_1.UserResolver]
    });
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        validationRules: [(0, graphql_depth_limit_1.default)(2)]
    });
    app.use((0, cors_1.default)({
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
    }));
    app.use((0, compression_1.default)());
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = http.createServer(app);
    httpServer.listen({ port: 8080 }, () => {
        console.log(`🚀 Server ready and listening at ==> http://localhost:8080/graphql`);
    });
}
initServer();
//# sourceMappingURL=server.js.map