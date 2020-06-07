import { Injectable } from '@nestjs/common';
import { UsersService } from '@nnest/users/users.service';
import { RequestUserDto } from './dtos/request-user-dto';
import { plainToClass, classToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dtos/jwt-payload-dto';
import { LoginResponseDto } from './dtos/login-response-dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register-dto';
import { User } from '@nnest/users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<RequestUserDto> {
    const user = await this.usersService.findOne(email, 'email');
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return plainToClass(RequestUserDto, result, {
        excludeExtraneousValues: true,
      });
    }
    return null;
  }

  async login(user: RequestUserDto): Promise<LoginResponseDto> {
    const payload: JwtPayloadDto = { ...user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterDto): Promise<LoginResponseDto> {
    user.password = await AuthService.hashPassword(user.password);
    const savedUser: User = await this.usersService.register(user);
    const payload: JwtPayloadDto = plainToClass(JwtPayloadDto, { ...savedUser, sub: savedUser.id }, {
      excludeExtraneousValues: true
    });
    return {
      access_token: this.jwtService.sign(classToPlain(payload))
    }
  }

  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async isEmailAvailable(email: string) : Promise<boolean> {
    return this.usersService.isEmailAvailable(email);
  }

  async isUsernameAvailable(username: string) : Promise<boolean> {
    return this.usersService.isUsernameAvailable(username);
  }
}
