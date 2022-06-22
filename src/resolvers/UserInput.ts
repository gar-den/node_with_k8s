import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { GraphQLInt, GraphQLString } from "graphql";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(() => GraphQLString, { nullable: false })
  @Length(1, 10)
  name!: string;

  @Field(() => GraphQLString, { nullable: false })
  @Length(10, 11)
  phone!: string;
}

@InputType()
export class GetUserInput implements Partial<User> {
  @Field(() => GraphQLInt, { nullable: false })
  userId!: number;
}

@InputType()
export class TestInput {
  @Field(() => GraphQLString, { nullable: false })
  message!: string;
}