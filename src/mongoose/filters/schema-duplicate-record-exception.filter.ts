import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { SchemaDuplicateRecordException } from "../exceptions/schema-duplicate-record.exception";

@Catch(SchemaDuplicateRecordException)
export class SchemaDuplicateRecordExceptionFilter implements ExceptionFilter {
  catch(exception: SchemaDuplicateRecordException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: {
        message: exception.message,
        keyValue: exception.keyValue
      },
      error: 'Bad Request',
    });
  }
}
