import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @Length(3, 15)
  @IsString()
  @ApiProperty({
    description: 'username',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'email',
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  @ApiProperty({
    description: 'password',
  })
  password: string;

  @Length(3, 20)
  @ApiProperty({
    description: 'name',
  })
  name: string;
}
