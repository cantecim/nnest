import { ValidatorOptions, validate } from 'class-validator';
import { EntityValidationException } from '../exceptions/entity-validation-exception';

type Class = { new(...args: any[]): any; };
export const defaultValidatorOptions: ValidatorOptions = { validationError: { target: false, value: false } };
export async function entityValidateOrReject<T>(
  object: T,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function entityValidateOrReject<T>(
  schemaName: string,
  object: T,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function entityValidateOrReject<T>(
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
    if(!objectOrValidationOptions) {
      objectOrValidationOptions = defaultValidatorOptions;
    }
    errors = await validate(
      objectOrSchemaName as T,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
  if (errors.length > 0) {
    throw new EntityValidationException(errors);
  }
}
