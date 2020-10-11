import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { classToPlain } from 'class-transformer';
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

  async getOne(user: string): Promise<DocumentType<UserProfileSchemaType>> {
    const doc = await this.userProfileModel.findOne({
      user
    });
    if(!doc) {
      throw new NotFoundException("No user found with this id");
    }

    return doc as unknown as DocumentType<UserProfileSchemaType>;
  }

  async createOrUpdateUserProfile<T extends IUserProfileDto = UserProfileDto>(
    userProfile: T,
    user: DocumentType<UserSchema>,
  ): Promise<DocumentType<UserProfileSchemaType>> {
    const profile = classToPlain(userProfile);
    profile.user = user._id.toString();
    const up = await this.userProfileModel.findOne(
      {
        user: profile.user,
      },
    );
    if(up) {
      Object.assign(up, userProfile);
      return up.save() as unknown as DocumentType<UserProfileSchemaType>;
    } else {
      return this.userProfileModel.create(profile as any) as unknown as DocumentType<UserProfileSchemaType>;
    }
  }
}
