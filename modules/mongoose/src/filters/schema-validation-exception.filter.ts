import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { SchemaValidationException } from '../exceptions/schema-validation.exception';

@Catch(SchemaValidationException)
export class SchemaValidationExceptionFilter implements ExceptionFilter {
  catch(exception: SchemaValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.errors,
      error: 'Bad Request',
    });
  }
}
