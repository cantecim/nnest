import { RequestUserDto } from './request-user-dto';
import { Expose } from 'class-transformer';

export class JwtPayloadDto {
  @Expose()
  username: string;

  @Expose()
  id: number;

  @Expose()
  sub: number;
}
