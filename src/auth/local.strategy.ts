import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptionsWithRequest } from 'passport-local';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestUserDto } from './dtos/request-user-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email'
    } as IStrategyOptionsWithRequest);
  }

  async validate(email: string, password: string): Promise<RequestUserDto> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
