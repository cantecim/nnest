import { Injectable } from '@nestjs/common';
import { plainToClass, classToPlain } from 'class-transformer';
import { UserDto } from "@nnest/users/dtos/user.dto";
import { InjectModel } from "nestjs-typegoose";
import { UserSchema } from "@nnest/users/schema/user.schema";
import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { schemaValidateOrReject } from "@nnest/mongoose/helpers/schema-validate-or-reject";
import { RegisterUserDto } from "@nnest/users/dtos/register-user-dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema)
    private readonly userModel: ReturnModelType<typeof UserSchema>,
  ) {}

  private async save(user: UserDto): Promise<DocumentType<UserSchema>> {
    const u = plainToClass(UserDto, user);
    // No need to validate here in thanks to BaseSchema hook,
    // This line is left because to show it in documentation
    // Note : We are creating a Model instance here to have .toJSON method in prototype
    await schemaValidateOrReject(UserSchema, new this.userModel(u));
    const userDocument: DocumentType<UserSchema> = await this.userModel.create(
      u,
    );
    return userDocument.toJSON();
  }

  async register(user: UserDto): Promise<RegisterUserDto> {
    return new Promise<RegisterUserDto>(async (resolve, reject) => {
      try {
        const result: UserDto = await this.save(user);
        // plainToClass and then classToPlain, simply we are filtering excluded fields
        resolve(plainToClass(RegisterUserDto, classToPlain(result)));
      } catch (error) {
        // in order to not hang the request we have to handle rejection
        // remember: if you create a promise be sure to fulfil or reject it finally...
        reject(error);
      }
    });
  }

  async findOne(
    fieldValue: string,
    fieldName?: 'username' | 'email',
  ): Promise<UserDto | null> {
    const userDocument: DocumentType<
      UserSchema
    > | null = await this.userModel.findOne({
      [fieldName ?? 'username']: fieldValue,
    });
    return userDocument ? plainToClass(UserDto, userDocument.toJSON()) : null;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    return (
      (await this.userModel.count({
        email,
      })) == 0
    );
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    return (
      (await this.userModel.count({
        username,
      })) == 0
    );
  }
}
