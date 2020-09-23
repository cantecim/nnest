import { index, modelOptions, mongoose, prop } from "@typegoose/typegoose";
import { BaseSchema } from '@nnest/mongoose/schemas/base.schema';

/*
WARNING: In this file, we use string ref to avoid circular dependency problems
 */

let _userProfileSchema: any;

export function setUserProfileSchemaClass<T extends typeof UserProfileSchema>(
  sc: T,
): void {
  _userProfileSchema = sc;
}

export function getUserProfileSchemaClass<
  T extends typeof UserProfileSchema
  >(): T {
  return _userProfileSchema as T;
}

function applyDecorators(): ClassDecorator {
  return function (target: any) {
    const mo = modelOptions({
      schemaOptions: {
        collection: 'users.profile',
      },
    });
    const userIndex = index({user: 1}, { unique: true});

    mo(target);
    userIndex(target);
  };
}

export function getUserProfileSchemaAsBaseClass<T extends BaseSchema>(): T {
  @applyDecorators()
  class UserProfileSchemaAsBaseClass extends UserProfileSchema {}

  return (UserProfileSchemaAsBaseClass as unknown) as T;
}

@applyDecorators()
class UserProfileSchema extends BaseSchema {
  @prop({
    ref: 'UserSchema',
    required: true,
  })
  user!: mongoose.Types.ObjectId;
}

_userProfileSchema = UserProfileSchema;
export type UserProfileSchemaType = typeof UserProfileSchema;
