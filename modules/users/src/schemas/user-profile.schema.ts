import { BaseSchema } from "@nnest/mongoose/schemas/base.schema";
import { modelOptions, Ref } from "@typegoose/typegoose";
import { UserSchema } from "./user.schema";

@modelOptions({
  schemaOptions: {
    collection: 'users.profile'
  }
})
export class UserProfileSchema extends BaseSchema {
  user: Ref<UserSchema>;
}