import * as locale from "locale-codes";

export function isLocaleCode(code: string): boolean {
  return typeof code === "string" && Boolean(locale.getByTag(code));
}