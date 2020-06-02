import { Controller, UseGuards, Post, Request, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register-dto';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login-dto';
import { LoginResponseDto } from './dtos/login-response-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginDto,
    description: 'Login payload'
  })
  @ApiCreatedResponse({
    description: 'The login successful',
    type: LoginResponseDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The register successful',
    type: LoginResponseDto,
  })
  async register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
  
}
