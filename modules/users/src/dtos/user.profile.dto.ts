import { IsString } from 'class-validator';

export class UserProfileDto implements IUserProfileDto {
  @IsString()
  country!: string;

  @IsString()
  province!: string;

  @IsString()
  city!: string;
}

export class IUserProfileDto {
  country!: string;

  province!: string;

  city!: string;
}