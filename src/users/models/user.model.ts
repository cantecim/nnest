// TODO : database module and default base class

import { Field } from "@nestjs/graphql";
import { Column, Index } from "typeorm";
import { IsEmail, IsString, Length, MinLength } from "class-validator";
import { Exclude } from "class-transformer";
import { prop } from "typegoose";

export class UserModel {
  @Field()
  @Column()
  @Length(3, 20)
  @prop({required :true})
  name: string;

  @Field()
  @Index({ unique: true })
  @Column()
  @Length(3, 15)
  @IsString()
  username: string;

  @Field()
  @Index({ unique: true })
  @Column()
  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @MinLength(8)
  password: string;
}