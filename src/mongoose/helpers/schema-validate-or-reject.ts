import { ValidatorOptions, validate } from 'class-validator';
import { SchemaValidationException } from '../exceptions/schema-validation.exception';
import { plainToClass } from "class-transformer";
import { DocumentType } from "@typegoose/typegoose";
import { SchemaType } from "mongoose";
import { ClassType } from "class-transformer/ClassTransformer";
import { ClassTransformOptions } from "class-transformer/ClassTransformOptions";

type Class = { new(...args: any[]): any; };
export const defaultValidatorOptions: ValidatorOptions = { validationError: { target: false, value: false } };
export async function schemaValidateOrReject<T>(
  mongooseSchema: T,
  object: DocumentType<any>,
  validatorOptions?: ValidatorOptions,
): Promise<void>;
export async function schemaValidateOrReject<T>(
  schemaName: string,
  mongooseSchema: T,
  object: DocumentType<any>,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

export async function schemaValidateOrReject<T>(
  mongooseSchemaOrSchemaName: T | string,
  objectOrMongooseSchema: DocumentType<any> | T,
  ValidatorOptionsOrObject: ValidatorOptions | DocumentType<any>,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<void> {
  let errors;
  // Just to be sure to not exclude extraneous values
  // If someone applied the class transformer patch, it will be true by default.
  const ptcOptions: ClassTransformOptions = {
    excludeExtraneousValues: false
  };
  if (maybeValidatorOptions) {
    // mongooseSchemaOrSchemaName = schemaName, objectOrMongooseSchema = mongooseSchema, ValidatorOptionsOrObject = object
    errors = await validate(
      mongooseSchemaOrSchemaName as string,
      plainToClass(objectOrMongooseSchema, (ValidatorOptionsOrObject as DocumentType<any>).toJSON(), ptcOptions),
      maybeValidatorOptions,
    );
  } else {
    // mongooseSchemaOrSchemaName = mongooseSchema, objectOrMongooseSchema = object, ValidatorOptionsOrObject = validatorOptions
    if(!ValidatorOptionsOrObject) {
      ValidatorOptionsOrObject = defaultValidatorOptions;
    }
    errors = await validate(
      plainToClass(
        mongooseSchemaOrSchemaName as unknown as ClassType<SchemaType>,
        (objectOrMongooseSchema as DocumentType<any>).toJSON(),
        ptcOptions
      ),
      ValidatorOptionsOrObject as ValidatorOptions,
    );
  }
  if (errors.length > 0) {
    throw new SchemaValidationException(errors);
  }
}
