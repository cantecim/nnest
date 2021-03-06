import { Injectable } from '@nestjs/common';
import { UserService } from '@nnest/users/services/user.service';
import { RequestUserDto } from './dtos/request-user-dto';
import { plainToClass, classToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dtos/jwt-payload-dto';
import { LoginResponseDto } from './dtos/login-response-dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register-dto';
import { RegisterUserDto } from '@nnest/users/dtos/register-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<RequestUserDto | null> {
    const user = await this.usersService.findOne(email, 'email');
    if (user && (await bcrypt.compare(password, user.password))) {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,
        ...result
      }: {
        password: string;
        _id: string;
        name: string;
        username?: string;
        email: string;
      } = user;
      const reqUser = plainToClass(RequestUserDto, result, {
        excludeExtraneousValues: true,
      });
      reqUser.id = result._id.toString();
      return reqUser;
    }
    return null;
  }

  async login(user: RequestUserDto): Promise<LoginResponseDto> {
    const payload: JwtPayloadDto = plainToClass(
      JwtPayloadDto,
      { ...user, sub: user.id },
      {
        excludeExtraneousValues: true,
      },
    );
    return {
      access_token: this.jwtService.sign(classToPlain(payload)),
      user,
    };
  }

  async register(user: RegisterDto): Promise<LoginResponseDto> {
    user.password = await AuthService.hashPassword(user.password);
    const savedUser: RegisterUserDto = await this.usersService.register(user);
    const payload: JwtPayloadDto = plainToClass(JwtPayloadDto, {
      ...savedUser,
      id: savedUser._id,
      sub: savedUser._id,
    });
    return {
      access_token: this.jwtService.sign(classToPlain(payload)),
      user: plainToClass(RequestUserDto, {
        ...savedUser,
        id: savedUser._id
      }, {
        excludeExtraneousValues: true,
      }),
    };
  }

  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    return this.usersService.isEmailAvailable(email);
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    return this.usersService.isUsernameAvailable(username);
  }
}
