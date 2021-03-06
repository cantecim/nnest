import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './dtos/jwt-payload-dto';
import { ConfigurationsEnum } from '@nnest/helpers/config-options';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigurationsEnum.jwt.secret.key, ConfigurationsEnum.jwt.secret.default),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<any>  {
    return { id: payload.sub, username: payload.username };
  }
}
