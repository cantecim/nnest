import { Injectable } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { classToPlain } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { InjectModel } from 'nestjs-typegoose';
import { IUserProfileDto, UserProfileDto } from '../dtos/user.profile.dto';
import {
  UserProfileSchemaType,
  getUserProfileSchemaClass,
} from '../schemas/user-profile.schema';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(getUserProfileSchemaClass())
    private readonly userProfileModel: ReturnModelType<UserProfileSchemaType>,
  ) {}

  async createUserProfile<T extends IUserProfileDto = UserProfileDto>(
    userProfile: T,
    user: DocumentType<UserSchema>,
  ): Promise<DocumentType<UserProfileSchemaType>> {
    const profile = classToPlain(userProfile);
    profile.user = user._id.toString();
    return this.userProfileModel.create(profile as any) as unknown as DocumentType<UserProfileSchemaType>;
  }
}
