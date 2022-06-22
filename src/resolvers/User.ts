import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, GetUserInput, TestInput } from "./UserInput";
import { FindConditions, FindOneOptions, getRepository } from "typeorm";
import { TestOutput } from "./UserOutput";


@Resolver(User)
export class UserResolver {
  async findOne(where: FindConditions<User>, options?: FindOneOptions<User>): Promise<User> {
    const userRepo = getRepository(User)
    const user = await userRepo.findOneOrFail(where, options)

    return user
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const { name, phone } = data

    const userRepo = getRepository(User)
    const userInst = userRepo.create({ name, phone })
    const { identifiers } = await userRepo.insert(userInst)

    const user = await this.findOne({ userId: identifiers[0].userId })

    return user
  }

  @Query(() => User)
  async getUser(@Arg('data') data: GetUserInput): Promise<User> {
    const { userId } = data

    const user = await this.findOne({ userId })

    return user
  }

  @Query(() => TestOutput)
  async test(@Arg('data') data: TestInput): Promise<TestOutput> {
    return { message: `hello ${data.message}` }
  }
}