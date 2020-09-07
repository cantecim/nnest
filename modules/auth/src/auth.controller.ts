import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '@nnest/guards/local-auth-guard';
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
    description: 'Login payload',
  })
  @ApiCreatedResponse({
    description: 'The login successful',
    type: LoginResponseDto,
  })
  async login(@Request() req: any): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The register successful',
    type: LoginResponseDto,
  })
  async register(@Body() payload: RegisterDto): Promise<LoginResponseDto> {
    return this.authService.register(payload);
  }

  @Post('is-email-available')
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean', description: 'Result of the availability' },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'E-Mail' },
      },
    },
  })
  async isEmailAvailable(@Body('email') email: string): Promise<Record<'result', boolean>> {
    return {
      result: await this.authService.isEmailAvailable(email),
    };
  }

  @Post('is-username-available')
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        result: { type: 'boolean', description: 'Result of the availability' },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'E-Mail' },
      },
    },
  })
  async isUsernameAvailable(@Body('username') username: string): Promise<Record<'result', boolean>> {
    return {
      result: await this.authService.isUsernameAvailable(username),
    };
  }
}
