import iso6391 from "iso-639-1";

export function isISO6391(code: string): boolean {
  return typeof code === "string" && iso6391.validate(code);
}