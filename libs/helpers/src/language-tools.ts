export function strToBoolean(value: string | boolean): boolean {
  if(typeof(value) == "boolean") {
    return value;
  }
  return ["on", "true", "1"].includes(value as string);
}