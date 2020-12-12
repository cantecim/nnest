import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RequestUserDto {
  @ApiProperty()
  @Expose()
  @Field()
  username?: string;

  @ApiProperty()
  @Expose()
  @Field()
  id!: string;

  @ApiProperty()
  @Expose()
  @Field()
  email!: string;

  @ApiProperty({
    description: "Full name of the user"
  })
  @Expose()
  @Field()
  name!: string;
}
