import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configOptions from '../config-options';
import { TypeOrmConfigService } from './type-orm-config-service.service';

// This file created for TypeORM CLI
// It exports a configuration object to use with CLI, without needing to duplication configurations
// We are simply using our modules as is to make them create configuration as it would be in NestJS application bootstrapping cycle

// Make sure ConfigModule reads the .env and set ups the process.env for us
ConfigModule.forRoot(configOptions);
export = new TypeOrmConfigService(
  new ConfigService(process.env),
  new Logger(),
).createTypeOrmOptions();
