import { DynamicModule, Module } from "@nestjs/common";
import { WinstonModule } from '@nnest/winston/winston.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersResolver } from './users.resolver';
import { TypegooseModule } from "nestjs-typegoose";
import { UserSchema } from "./schemas/user.schema";
import { getUserProfileSchemaClass, UserProfileSchemaType} from "./schemas/user-profile.schema";

@Module({})
export class UsersModule {
  static forRoot(overrideUserProfileSchema?: UserProfileSchemaType): DynamicModule {
    return {
      module: UsersModule,
      imports: [
        WinstonModule,
        TypegooseModule.forFeature([UserSchema, overrideUserProfileSchema ?? getUserProfileSchemaClass()]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      controllers: [UsersController],
      providers: [UsersService, UsersResolver],
      exports: [UsersService],
    }

  }
}
