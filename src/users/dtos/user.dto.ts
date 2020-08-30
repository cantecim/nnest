import { IsEmail, IsString, Length, MinLength } from "class-validator";
import { Exclude } from "class-transformer";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
  @Field()
  @Length(3, 20)
  name!: string;

  @Field()
  @Length(3, 15)
  @IsString()
  username!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  password!: string;
}