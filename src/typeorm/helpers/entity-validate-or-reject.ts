import { ValidatorOptions, validate } from 'class-validator';
import { EntityValidationException } from '../exceptions/entity-validation-exception';

export const defaultValidatorOptions: ValidatorOptions = { validationError: { target: false, value: false } };
export async function entityValidateOrReject(
  object: Record<string, unknown>,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function entityValidateOrReject(
  schemaName: string,
  object: Record<string, unknown>,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function entityValidateOrReject(
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
    if(!objectOrValidationOptions) {
      objectOrValidationOptions = defaultValidatorOptions;
    }
    errors = await validate(
      objectOrSchemaName as Record<string, unknown>,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
  if (errors.length > 0) {
    throw new EntityValidationException(errors);
  }
}
