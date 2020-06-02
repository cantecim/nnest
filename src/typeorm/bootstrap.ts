import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configOptions from '../config-options';
import { TypeOrmConfigService } from './type-orm-config-service.service';
import * as ConfigConstants from '@nestjs/config/dist/config.constants'

// This file created for TypeORM CLI
// It exports a configuration object to use with CLI, without needing to duplication configurations
// We are simply using our modules as is to make them create configuration as it would be in NestJS application bootstrapping cycle

// Make sure ConfigModule reads the .env and set ups the process.env for us
ConfigModule.forRoot(configOptions);
const configService = new ConfigService(process.env);
// Disable sqlite to make it run with production database dialect
process.env['SQLITE_IN_DEV'] = 'false';
if(process.env[ConfigConstants.VALIDATED_ENV_PROPNAME]) {
  process.env[ConfigConstants.VALIDATED_ENV_PROPNAME]['SQLITE_IN_DEV'] = 'false';
}
export = new TypeOrmConfigService(
  configService,
  new Logger(),
).createTypeOrmOptions();
