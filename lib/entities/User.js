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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_1.GraphQLInt, { description: 'user id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', comment: 'user id' }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_1.GraphQLString, { description: 'user name' }),
    (0, typeorm_1.Column)('varchar', { nullable: false, comment: 'user name', length: 10 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_1.GraphQLString, { description: 'user phone without hyphen(-)', nullable: false }),
    (0, typeorm_1.Column)('varchar', { nullable: false, comment: 'user phone without hyphen(-)', length: 174 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)({
        description: 'User',
        isAbstract: false // true면 DTO 확장하여 inputType으로도 사용할 수 있다.
    })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map