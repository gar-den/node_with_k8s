
import { Field, ObjectType } from "type-graphql";
import { GraphQLString } from "graphql";

@ObjectType()
export class TestOutput {
  @Field(() => GraphQLString, { nullable: false })
  message!: string;
}