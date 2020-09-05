import { ValidatorOptions, validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation-exception';

export async function safeValidateOrReject<T>(
  object: T,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function safeValidateOrReject<T>(
  schemaName: string,
  object: T,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function safeValidateOrReject<T>(
  objectOrSchemaName: T | string,
  objectOrValidationOptions: T | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<void> {
  let errors;
  if (maybeValidatorOptions) {
    errors = await validate(
      objectOrSchemaName as string,
      objectOrValidationOptions as T,
      maybeValidatorOptions,
    );
  } else {
    errors = await validate(
      objectOrSchemaName as T,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }
}
