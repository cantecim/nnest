import 'module-alias/register';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiDataPropertyMiddleware } from './api/middlewares/api-data-property.middleware';
import { AppModule } from './app.module';
import { globalLogger } from './winston/winston.module';
import { SchemaValidationExceptionFilter } from "@nnest/mongoose/filters/schema-validation-exception.filter";
import { SchemaDuplicateRecordExceptionFilter } from "@nnest/mongoose/filters/schema-duplicate-record-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: globalLogger,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors();
  app.use(app.get(ApiDataPropertyMiddleware).use);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
      validationError: {
        target: false,
        value: false,
      },
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new SchemaValidationExceptionFilter());
  app.useGlobalFilters(new SchemaDuplicateRecordExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('REST API Documentations')
    .setDescription(
      'You can see all the information about our REST APIs and try them on the page',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
