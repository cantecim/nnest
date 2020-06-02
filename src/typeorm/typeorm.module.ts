import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config-service.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from '@nnest/winston/winston.module';

@Module({
  imports: [
    ConfigModule,
    WinstonModule,
    NestTypeOrmModule.forRootAsync({
      imports: [ConfigModule, WinstonModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [TypeOrmConfigService],
  // exports: [NestTypeOrmModule],
})
export class TypeOrmModule {}
