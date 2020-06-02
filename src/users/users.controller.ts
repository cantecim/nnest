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

  @Get()
  public async index(): Promise<string> {
    let u = new User();
    u.name = 'Can Tecim';
    u.username = 'cantecim';
    u.email = 'can.tecim@gmail.com';
    u.password = await AuthService.hashPassword('123');
    u.save()    
    try {
      await this.userService.register({
        username: 'cantecim',
      });
    } catch (e) {
      throw e;
    }
    return 'Hello this is the index of user resource';
  }
  
}
