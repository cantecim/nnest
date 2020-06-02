import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './winston/winston.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiDataPropertyMiddleware } from './api/middlewares/api-data-property.middleware';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { EntityValidationExceptionFilter } from './typeorm/entity-validation-exception-filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: globalLogger,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
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
  await app.listen(process.env.PORT);
}
bootstrap();
