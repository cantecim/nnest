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
import { ApiBody, ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dtos/login-dto';
import { LoginResponseDto } from './dtos/login-response-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: "Login with user information to get an access token"
  })
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

  @ApiOperation({
    summary: "Register a new user"
  })
  @Post('register')
  @ApiCreatedResponse({
    description: 'The register successful',
    type: LoginResponseDto,
  })
  async register(@Body() payload: RegisterDto): Promise<LoginResponseDto> {
    return this.authService.register(payload);
  }

  @ApiOperation({
    summary: "Check if given email is available"
  })
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
        email: { type: 'string', description: 'E-Mail address to check availability' },
      },
    },
  })
  async isEmailAvailable(@Body('email') email: string): Promise<Record<'result', boolean>> {
    return {
      result: await this.authService.isEmailAvailable(email),
    };
  }

  @ApiOperation({
    summary: "Check if given username is available"
  })
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
        username: { type: 'string', description: 'Username to check availability' },
      },
    },
  })
  async isUsernameAvailable(@Body('username') username: string): Promise<Record<'result', boolean>> {
    return {
      result: await this.authService.isUsernameAvailable(username),
    };
  }
}
