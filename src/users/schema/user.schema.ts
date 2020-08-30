// TODO : database module and default base class

import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { index, pre, prop } from '@typegoose/typegoose';
import { BaseSchema } from '@nnest/mongoose/schemas/base.schema';
import { schemaValidateOrReject } from '@nnest/mongoose/helpers/schema-validate-or-reject';

@pre<BaseSchema>('save', async function () {
  await schemaValidateOrReject(UserSchema, this);
})
@index({ username: 1 }, { unique: true })
@index({ email: 1 }, { unique: true })
export class UserSchema extends BaseSchema {
  @Length(3, 20)
  @prop({ required: true })
  name!: string;

  @Length(3, 15)
  @IsString()
  @prop({ required: true })
  username!: string;

  @IsEmail()
  @prop({ required: true })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @prop({ required: true })
  password!: string;
}
