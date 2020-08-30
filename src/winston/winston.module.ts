import { Logger as NestLogger, Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule as NestWinstonModule,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { Logger } from './logger.service';

const defaultLogLevel = 'debug';
const createConsoleTransport = (level: string): ConsoleTransportInstance =>
  new winston.transports.Console({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
  });
const envLogLevel = process.env.LOG_LEVEL ?? defaultLogLevel;

const loggerOptions: WinstonModuleOptions = {
  level: envLogLevel,
  levels: winston.config.npm.levels,
  transports: [
    createConsoleTransport(envLogLevel),
    // other transports...
  ],
  // other options
};
// We are creating the globalLogger out of the module context
export const globalLogger = NestWinstonModule.createLogger(
  loggerOptions,
) as Logger;
// And we override this method, if someone wants to create Logger we give our logger
// eslint-disable-next-line @typescript-eslint/no-unused-vars
NestWinstonModule.createLogger = (options?: WinstonModuleOptions) => {
  return globalLogger;
};

@Global()
@Module({
  imports: [
    ConfigModule,
    NestWinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        NestLogger.debug(
          `When using this module, please make sure to import ConfigModule before this module as we try to get env variables from process.env
          while creating global logger for bootstrapping`,
          'winston',
        );
        return Object.assign({}, loggerOptions, {
          level: config.get<string>('LOG_LEVEL', 'info'),
          transports: [createConsoleTransport(config.get<string>('LOG_LEVEL', 'info'))],
        } as WinstonModuleOptions);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: Logger,
      useFactory: () => {
        globalLogger.setContext('');
        return globalLogger;
      },
    },
  ],
  exports: [Logger],
})
export class WinstonModule {}
