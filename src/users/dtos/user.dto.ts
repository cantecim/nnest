import { IsEmail, IsString, Length, MinLength } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
  @Field()
  @Length(3, 20)
  @Expose()
  name!: string;

  @Field()
  @Length(3, 15)
  @IsString()
  @Expose()
  username!: string;

  @Field()
  @IsEmail()
  @Expose()
  email!: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @Expose()
  password!: string;
}