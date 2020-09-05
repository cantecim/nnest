import { ValidationError } from 'class-validator';

export class SchemaValidationException extends Error {
  constructor(
    public errors: ValidationError[],
    public description = 'Validation Exception',
  ) {
    super();
  }
}
