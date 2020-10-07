import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { index, modelOptions, pre, prop, Ref } from "@typegoose/typegoose";
import { BaseSchema } from '@nnest/mongoose/schemas/base.schema';
import { schemaValidateOrReject } from '@nnest/mongoose/helpers/schema-validate-or-reject';
import { getUserProfileSchemaClass, UserProfileSchemaType } from "./user-profile.schema";

@pre<BaseSchema>('save', async function () {
  await schemaValidateOrReject(UserSchema, this);
})
@index({ username: 1 }, { unique: true })
@index({ email: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserSchema extends BaseSchema {
  @ApiProperty({
    description: "Full name",
    minLength: 3,
    maxLength: 20
  })
  @Length(3, 20)
  @prop({ required: true })
  name!: string;

  @ApiProperty({
    description: "Username of the user",
    minLength: 3,
    maxLength: 15
  })
  @Length(3, 15)
  @IsString()
  @prop({ required: true })
  username!: string;

  @ApiProperty({
    description: "E-Mail address",
    format: "email"
  })
  @IsEmail()
  @prop({ required: true })
  email!: string;

  @ApiProperty({
    description: "Login password",
    minLength: 8,
  })
  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @prop({ required: true })
  password!: string;

  @ApiProperty({
    description: "User profile object",
    type: getUserProfileSchemaClass()
  })
  @prop({
    ref: getUserProfileSchemaClass()
  })
  profile?: Ref<UserProfileSchemaType>;
}
