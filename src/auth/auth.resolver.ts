import { Resolver, Args, Query } from '@nestjs/graphql';
import { LoginResponseDto } from './dtos/login-response-dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register-dto';

@Resolver(of => LoginResponseDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => LoginResponseDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const reqUserDto = await this.authService.validateUser(email, password);
    return this.authService.login(reqUserDto);
  }

  @Query(returns => LoginResponseDto)
  async register(
    @Args() args: RegisterDto
  ) {
    return await this.authService.register(args);
  }
}
