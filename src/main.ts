import 'module-alias/register';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiDataPropertyMiddleware } from './api/middlewares/api-data-property.middleware';
import { AppModule } from './app.module';
import { EntityValidationExceptionFilter } from './typeorm/entity-validation-exception-filter';
import { globalLogger } from './winston/winston.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: globalLogger,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors();
  app.use(app.get(ApiDataPropertyMiddleware).use);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new BadRequestException(errors);
    },
    validationError: {
      target: false,
      value: false
    }
  }));
  app.useGlobalFilters(new EntityValidationExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('REST API Documentations')
    .setDescription('You can see all the information about our REST APIs and try them on the page')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
