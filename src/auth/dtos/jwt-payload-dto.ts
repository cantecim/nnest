import { RequestUserDto } from './request-user-dto';
import { Expose } from 'class-transformer';

export class JwtPayloadDto extends RequestUserDto {
  @Expose()
  sub: number;
}
