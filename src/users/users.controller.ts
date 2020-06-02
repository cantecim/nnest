import { Controller, Logger, Get, Post, Body, UseGuards } from '@nestjs/common';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user-dto';
import { validateOrReject } from 'class-validator';
import { plainToClass, classToPlain } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly logger: Logger,
  ) {
    logger.setContext(this.constructor.name);
  }
  
}
