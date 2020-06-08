import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityValidationException } from './exceptions/entity-validation-exception';

@Catch(EntityValidationException)
export class EntityValidationExceptionFilter implements ExceptionFilter {
  catch(exception: EntityValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.errors,
      error: 'Bad Request',
    });
  }
}
