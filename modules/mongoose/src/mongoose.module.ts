import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TypegooseModule } from 'nestjs-typegoose';
import mongoose from "mongoose";
import { setLogLevel, LogLevels } from "@typegoose/typegoose";
import { strToBoolean } from "@nnest/helpers/language-tools";

// Some mongoose global configurations
// mongoose.SchemaTypes.ObjectId.get((v: mongoose.Types.ObjectId) => v?.toString());


@Module({
  imports: [
    ConfigModule,
    WinstonModule,
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbDebug: boolean = strToBoolean(configService.get<boolean>("DATABASE_DEBUG", false));
        // Set mongoose debug
        mongoose.set("debug", dbDebug);

        // Set typegoose debug
        setLogLevel(dbDebug ? LogLevels.DEBUG : LogLevels.INFO);
        return {
        uri: configService.get<string>('DATABASE_URI', ''),
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }},
    }),
  ],
})
export class MongooseModule {}
