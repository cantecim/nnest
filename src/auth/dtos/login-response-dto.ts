import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @Expose()
  @ApiProperty()
  access_token: string;
}
