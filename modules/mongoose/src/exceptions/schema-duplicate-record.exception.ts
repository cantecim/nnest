export class SchemaDuplicateRecordException extends Error {
  constructor(public keyValue: Record<string, string>, public message = 'Duplicate record.') {
    super();
  }
}
