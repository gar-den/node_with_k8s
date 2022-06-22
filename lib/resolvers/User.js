"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const UserInput_1 = require("./UserInput");
const typeorm_1 = require("typeorm");
// import { GraphQLString } from "graphql";
const UserOutput_1 = require("./UserOutput");
let UserResolver = class UserResolver {
    async findOne(where, options) {
        const userRepo = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepo.findOneOrFail(where, options);
        return user;
    }
    async createUser(data) {
        const { name, phone } = data;
        const userRepo = (0, typeorm_1.getRepository)(User_1.User);
        const userInst = userRepo.create({ name, phone });
        const { identifiers } = await userRepo.insert(userInst);
        const user = await this.findOne({ userId: identifiers[0].userId });
        return user;
    }
    async getUser(data) {
        const { userId } = data;
        const user = await this.findOne({ userId });
        return user;
    }
    async test(data) {
        return { message: `hello ${data.message}` };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.GetUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => UserOutput_1.TestOutput),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.TestInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "test", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map