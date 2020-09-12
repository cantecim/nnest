export class MongoException extends Error {
  constructor(public code?: number, public message = 'Unexpected mongo error') {
    super();
  }
}
