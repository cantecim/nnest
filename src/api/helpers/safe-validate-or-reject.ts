import { ValidatorOptions, validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation-exception';

export async function safeValidateOrReject(
  object: Record<string, unknown>,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function safeValidateOrReject(
  schemaName: string,
  object: Record<string, unknown>,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function safeValidateOrReject(
  objectOrSchemaName: Record<string, unknown> | string,
  objectOrValidationOptions: Record<string, unknown> | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<void> {
  let errors;
  if (maybeValidatorOptions) {
    errors = await validate(
      objectOrSchemaName as string,
      objectOrValidationOptions as Record<string, unknown>,
      maybeValidatorOptions,
    );
  } else {
    errors = await validate(
      objectOrSchemaName as Record<string, unknown>,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }
}
