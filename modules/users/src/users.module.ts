import { Module } from '@nestjs/common';
import { WinstonModule } from '@nnest/winston/winston.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersResolver } from './users.resolver';
import { TypegooseModule } from "nestjs-typegoose";
import { UserSchema } from "./schema/user.schema";

@Module({
  imports: [
    WinstonModule,
    TypegooseModule.forFeature([UserSchema]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
