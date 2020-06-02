import { ValidatorOptions, validate } from 'class-validator';
import { EntityValidationException } from '../exceptions/entity-validation-exception';

export async function entityValidateOrReject(
  object: Object,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function entityValidateOrReject(
  schemaName: string,
  object: Object,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function entityValidateOrReject(
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
    throw new EntityValidationException(errors);
  }
}
