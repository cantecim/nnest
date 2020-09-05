import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';
import { RequestUserDto } from "@nnest/auth/dtos/request-user-dto";

@ObjectType()
export class LoginResponseDto {
  @Field()
  @Expose()
  @ApiProperty()
  access_token!: string;

  @Field()
  @Expose()
  @ApiProperty()
  user!: RequestUserDto
}
