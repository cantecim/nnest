import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';
import { RequestUserDto } from "./request-user-dto";

@ObjectType()
export class LoginResponseDto {
  @Field()
  @Expose()
  @ApiProperty({
    description: "Bearer access token"
  })
  access_token!: string;

  @Field()
  @Expose()
  @ApiProperty({
    description: "User object for logged in user"
  })
  user!: RequestUserDto
}
