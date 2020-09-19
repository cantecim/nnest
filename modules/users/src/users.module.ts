import { DynamicModule, Module } from "@nestjs/common";
import { WinstonModule } from '@nnest/winston/winston.module';
import { UsersController } from './controllers/users.controller';
import { UserProfileService } from './services/user-profile.service';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { UsersResolver } from './resolvers/users.resolver';
import { TypegooseModule } from "nestjs-typegoose";
import { UserSchema } from "./schemas/user.schema";
import { getUserProfileSchemaClass, UserProfileSchemaType} from "./schemas/user-profile.schema";

let _currentUserProfileSchema: UserProfileSchemaType = getUserProfileSchemaClass();

@Module({})
export class UsersModule {
  static forRoot(overrideUserProfileSchema?: UserProfileSchemaType): DynamicModule {
    if(overrideUserProfileSchema) {
      _currentUserProfileSchema = overrideUserProfileSchema;
    }
    return {
      module: UsersModule,
      imports: [
        WinstonModule,
        TypegooseModule.forFeature([UserSchema, _currentUserProfileSchema]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      controllers: [UsersController],
      providers: [UserService, UsersResolver, UserProfileService],
      exports: [UserService, UserProfileService, UsersResolver],
    }
  }

  static forFeature(): DynamicModule {
    return UsersModule.forRoot()
  }
}
