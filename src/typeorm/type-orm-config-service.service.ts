import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import { ConfigurationsEnum } from '@nnest/config-options';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    logger.setContext(this.constructor.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    this.logger.log('initializing typeorm configuration');
    let conf: TypeOrmModuleOptions = {
      type: this.configService.get(
        ConfigurationsEnum.db.driver.key,
        ConfigurationsEnum.db.driver.default,
      ) as any,
      host: this.configService.get<string>(ConfigurationsEnum.db.host.key, ConfigurationsEnum.db.host.default),
      port: Number(this.configService.get(ConfigurationsEnum.db.port.key, ConfigurationsEnum.db.port.default)),
      username: this.configService.get<string>(ConfigurationsEnum.db.username.key, ConfigurationsEnum.db.username.default),
      password: this.configService.get<string>(ConfigurationsEnum.db.password.key, ConfigurationsEnum.db.password.default),
      database: this.configService.get<string>(ConfigurationsEnum.db.name.key, ConfigurationsEnum.db.name.default),
      migrationsRun: this.configService.get(ConfigurationsEnum.db.migrationsRun.key, ConfigurationsEnum.db.migrationsRun.default) == 'true',
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/../migrations/*.{ts,js}`],
      logging: process.env.NODE_ENV !== 'production'
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
      (this.configService.get(ConfigurationsEnum.db.sqliteInDev.key, ConfigurationsEnum.db.sqliteInDev.default) == 'true' &&
        process.env.NODE_ENV == 'development') ||
      process.env.NODE_ENV == 'test'
    ) {
      // override required configurations to use sqlite
      this.logger.debug('forcing to use sqlite');
      conf = Object.assign(conf, {
        type: 'sqlite',
        database: process.env.NODE_ENV == 'test' ? ':memory:' : 'db.sqlite3',
        synchronize: true,
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
