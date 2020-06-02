import { ValidatorOptions, validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation-exception';

export async function SafeValidateOrReject(
  object: Object,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function SafeValidateOrReject(
  schemaName: string,
  object: Object,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function SafeValidateOrReject(
  objectOrSchemaName: object | string,
  objectOrValidationOptions: object | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<void> {
  let errors;
  if (maybeValidatorOptions) {
    errors = await validate(
      objectOrSchemaName as string,
      objectOrValidationOptions as object,
      maybeValidatorOptions,
    );
  } else {
    errors = await validate(
      objectOrSchemaName as object,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }
}
