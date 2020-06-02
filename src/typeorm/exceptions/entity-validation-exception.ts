import { ValidationError } from 'class-validator';

export class EntityValidationException extends Error {
  constructor(
    public errors: ValidationError[],
    public description = 'Validation Exception',
  ) {
    super();
  }
}
