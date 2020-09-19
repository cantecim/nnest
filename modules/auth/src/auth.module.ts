import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@nnest/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        UsersModule.forFeature(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService): JwtModuleOptions => ({
            secret: config.get('JWT_SECRET', 'secret'),
            signOptions: {
              expiresIn: config.get('JWT_EXPIRES_IN', '4h'),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
      controllers: [AuthController],
      exports: [LocalStrategy, JwtStrategy, AuthResolver],
    };
  }

  static forFeature(): DynamicModule {
    return AuthModule.forRoot();
  }
}
