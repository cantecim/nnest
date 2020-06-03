import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDto {
  @Field()
  @Expose()
  @ApiProperty()
  access_token: string;
}
