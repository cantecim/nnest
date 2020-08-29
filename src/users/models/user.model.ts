// TODO : database module and default base class

import { Field } from "@nestjs/graphql";
import { IsEmail, IsString, Length, MinLength } from "class-validator";
import { Exclude } from "class-transformer";
import { BaseSchema } from "@nnest/typeorm/models/base.schema";
import { prop } from "@typegoose/typegoose";

export class UserModel extends BaseSchema{
  @Field()
  @Length(3, 20)
  @prop({required :true})
  name!: string;

  @Field()
  @Length(3, 15)
  @IsString()
  @prop({required :true})
  username!: string;

  @Field()
  @IsEmail()
  @prop({required :true})
  email!: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @prop({required :true})
  password!: string;
}