import { Expose } from 'class-transformer';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RequestUserDto {
  @Expose()
  @Field()
  username!: string;

  @Expose()
  @Field()
  id!: string;

  @Expose()
  @Field()
  email!: string;

  @Expose()
  @Field()
  name!: string;
}
