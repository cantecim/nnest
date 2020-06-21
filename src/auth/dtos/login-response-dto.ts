import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntityProperties } from '@nnest/users/models/user.entity';

@ObjectType()
export class LoginResponseDto {
  @Field()
  @Expose()
  @ApiProperty()
  access_token: string;

  // @Field()
  @Expose()
  @ApiProperty()
  user!: UserEntityProperties
}
