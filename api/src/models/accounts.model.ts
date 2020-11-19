import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {
  @Field(type => Int)
  id: number;
}