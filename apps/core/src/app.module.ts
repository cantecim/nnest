import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@nnest/users/users.module';
import { WinstonModule } from '@nnest/winston/winston.module';
import { ApiModule } from '@nnest/api/api.module';
import { AuthModule } from '@nnest/auth/auth.module';
import configOptions from '@nnest/helpers/config-options';
import { join } from 'path';
import { MongooseModule } from '@nnest/mongoose/mongoose.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    ApiModule,
    UsersModule.forRoot(),
    MongooseModule,
    WinstonModule,
    AuthModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
      // include: [UsersModule]
    }),
  ],
})
export class AppModule {}
