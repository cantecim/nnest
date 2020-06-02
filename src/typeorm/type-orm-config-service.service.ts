import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Logger as TypeOrmLogger } from 'typeorm';
import { PlatformTools } from 'typeorm/platform/PlatformTools';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    logger.setContext(this.constructor.name);
  }

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    this.logger.log('initializing typeorm configuration');
    let conf: TypeOrmModuleOptions = {
      type: this.configService.get(
        'DATABASE_DRIVER',
        'postgres',
      ) as any,
      host: this.configService.get<string>('DATABASE_HOST'),
      port: Number(this.configService.get('DATABASE_PORT')),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      migrationsRun: this.configService.get('DATABASE_MIGRATIONS_RUN') == 'true',
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/../migrations/*.{ts,js}`],
      logging: process.env.NODE_ENV !== 'production',
    };
    const generalLog = (level = 'log') => (prefix: string, info: any) => {
      this.logger[level](info, prefix);
    };
    PlatformTools.logInfo = generalLog();
    PlatformTools.logWarn = generalLog('verbose');
    PlatformTools.logError = generalLog('error');
    PlatformTools.log = (message: string) => {
      generalLog()('TypeOrm', message);
    };
    this.logger.debug('overridden logging method of PlatformTools of typeorm');

    if (
      (this.configService.get('SQLITE_IN_DEV') == 'true' &&
        process.env.NODE_ENV == 'development') ||
      process.env.NODE_ENV == 'test'
    ) {
      // override required configurations to use sqlite
      this.logger.debug('forcing to use sqlite');
      conf = Object.assign(conf, {
        type: 'sqlite',
        database: process.env.NODE_ENV == 'test' ? ':memory:' : 'db.sqlite3',
      });
    }

    if (process.env.NODE_ENV == 'development') {
      conf = Object.assign(conf, {
        cli: {
          migrationsDir: 'src/migrations',
        },
      });
    }

    this.logger.log(
      `env is ${process.env.NODE_ENV} and we are using ${conf.type} driver`,
    );

    return conf;
  }
}
