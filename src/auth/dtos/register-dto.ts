import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @Length(3, 15)
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  password: string;

  @Length(3, 20)
  name: string;
}
