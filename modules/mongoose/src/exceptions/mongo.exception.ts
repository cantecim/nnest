export class MongoException extends Error {
  constructor(public name: string, public code?: number, public message = 'Unexpected mongo error') {
    super();
  }
}
