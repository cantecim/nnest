import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(
    objectOrError?: string | Record<string, unknown> | any,
    description = 'Validation Exception',
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
