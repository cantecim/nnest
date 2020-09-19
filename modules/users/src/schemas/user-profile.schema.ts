import { BaseSchema } from "@nnest/mongoose/schemas/base.schema";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { UserSchema } from "./user.schema";
import { ClassType } from "class-transformer/ClassTransformer";

@modelOptions({
  schemaOptions: {
    collection: 'users.profile'
  }
})
class UserProfileSchema extends BaseSchema {
  @prop({
    ref: UserSchema,
    required: true,
  })
  user!: Ref<UserSchema>;

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

export type UserProfileSchemaType = typeof UserProfileSchema;

let _userProfileSchema = UserProfileSchema;
export function setUserProfileSchemaClass<T extends UserProfileSchema>(sc: ClassType<T>): void {
  _userProfileSchema = sc;
}
export function getUserProfileSchemaClass<T extends typeof UserProfileSchema>(): T {
  return _userProfileSchema as T;
}