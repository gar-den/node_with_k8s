import { GraphQLInt, GraphQLString } from "graphql";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType({
  description: 'User',
  isAbstract: false  // true면 DTO 확장하여 inputType으로도 사용할 수 있다.
})
export class User extends BaseEntity {
  @Field(() => GraphQLInt, { description: 'user id' })
  @PrimaryGeneratedColumn({ type: 'int', comment: 'user id' })
  readonly userId!: number

  @Field(() => GraphQLString, { description: 'user name' })
  @Column('varchar', { nullable: false, comment: 'user name', length: 10 })
  name!: string

  @Field(() => GraphQLString, { description: 'user phone without hyphen(-)', nullable: false })
  @Column('varchar', { nullable: false, comment: 'user phone without hyphen(-)', length: 174 })
  phone!: string
}