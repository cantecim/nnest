import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from './typeorm/typeorm.module';
import { WinstonModule } from './winston/winston.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import configOptions from './config-options';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    ApiModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
    }),
    UsersModule,
    TypeOrmModule,
    WinstonModule,
    AuthModule
  ]
})
export class AppModule {}
