import { Resolver, Args, Query } from '@nestjs/graphql';
import { LoginResponseDto } from './dtos/login-response-dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register-dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: void) => LoginResponseDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => LoginResponseDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponseDto | null> {
    const reqUserDto = await this.authService.validateUser(email, password);
    if (reqUserDto) {
      return this.authService.login(reqUserDto);
    } else {
      // TODO : burada exception fırlatmalı
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => LoginResponseDto)
  async register(@Args() args: RegisterDto): Promise<LoginResponseDto> {
    return await this.authService.register(args);
  }
}
