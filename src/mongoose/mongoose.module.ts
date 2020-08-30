import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TypegooseModule } from 'nestjs-typegoose';
import mongoose from "mongoose";
import { setLogLevel, LogLevels } from "@typegoose/typegoose";

// Set mongoose debug
mongoose.set("debug", true);

// Set typegoose debug
setLogLevel(LogLevels.DEBUG);

@Module({
  imports: [
    ConfigModule,
    WinstonModule,
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI', ''),
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
    }),
  ],
})
export class MongooseModule {}
