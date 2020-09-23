import {registerDecorator, ValidationOptions} from "class-validator";
import { isLocaleCode } from "../validations/is-locale-code";

export function IsLocaleCode(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: "isLocaleCoe",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isLocaleCode(value);
        },
        defaultMessage(): string {
          return "$property should be a valid locale code";
        },
      },
    });
  };
}