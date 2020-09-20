import { ClassType } from "class-transformer/ClassTransformer";
import { modelOptions, mongoose, prop } from "@typegoose/typegoose";
import { BaseSchema } from "@nnest/mongoose/schemas/base.schema";

/*
WARNING: In this file, we use string ref to avoid circular dependency problems
 */

let _userProfileSchema: any;
export function setUserProfileSchemaClass<T extends UserProfileSchema>(sc: ClassType<T>): void {
  _userProfileSchema = sc;
}
export function getUserProfileSchemaClass<T extends typeof UserProfileSchema>(): T {
  return _userProfileSchema as T;
}

@modelOptions({
  schemaOptions: {
    collection: 'users.profile'
  }
})
class UserProfileSchema extends BaseSchema {
  @prop({
    ref: 'UserSchema',
    required: true,
  })
  user!: mongoose.Types.ObjectId;

  @prop({
    required: true
  })
  country!: string;

  @prop({
    required: true
  })
  province!: string;

  @prop({
    required: true
  })
  city!: string;
}

_userProfileSchema = UserProfileSchema;
export type UserProfileSchemaType = typeof UserProfileSchema;