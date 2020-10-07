import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class RegisterDto {
  @Field()
  @Length(3, 15)
  @IsString()
  @ApiProperty({
    description: 'username',
    minLength: 3,
    maxLength: 15
  })
  @Expose()
  username!: string;

  @Field()
  @IsEmail()
  @ApiProperty({
    description: 'email',
  })
  @Expose()
  email!: string;

  @Field()
  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @ApiProperty({
    description: 'password',
    minLength: 8
  })
  @Expose()
  password!: string;

  @Field()
  @Length(3, 20)
  @ApiProperty({
    description: 'Full name',
    minLength: 3,
    maxLength: 20
  })
  @Expose()
  name!: string;
}
