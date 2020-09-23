import {registerDecorator, ValidationOptions} from "class-validator";
import { isISO6391 } from "../validations";

export function IsISO6391(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: "isISO639-1",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isISO6391(value);
        },
        defaultMessage(): string {
          return "$property should be a valid ISO 639-1 code";
        },
      },
    });
  };
}