import { Exclude } from 'class-transformer';
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
  })
  username!: string;

  @Field()
  @IsEmail()
  @ApiProperty({
    description: 'email',
  })
  email!: string;

  @Field()
  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @ApiProperty({
    description: 'password',
  })
  password!: string;

  @Field()
  @Length(3, 20)
  @ApiProperty({
    description: 'name',
  })
  name!: string;
}
