import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoException } from "../exceptions/mongo.exception";

//
@Catch(MongoException)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      statusCode,
      message: {
        message: exception.message,
        mongo_code: exception.code
      },
      error: 'Bad Request',
    });
  }
}
