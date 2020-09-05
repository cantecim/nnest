import { ObjectType } from '@nestjs/graphql';
import { schemaValidateOrReject } from '../helpers/schema-validate-or-reject';
import { defaultClasses, DocumentType, post, pre } from '@typegoose/typegoose';
import { Error as _MongooseError } from 'mongoose';
import { SchemaDuplicateRecordException } from "../exceptions/schema-duplicate-record.exception";

type MongooseError = _MongooseError & { code?: number, keyValue: Record<string, string> };

@ObjectType({
  isAbstract: true,
})
@pre<BaseSchema>('save', async function () {
  // this.constructor points to late class
  await schemaValidateOrReject(this.constructor, this);
})
@post<BaseSchema>('save', function (
  error: MongooseError,
  doc: DocumentType<any>,
  next: any,
) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new SchemaDuplicateRecordException(error.keyValue));
  } else {
    next();
  }
})
export class BaseSchema extends defaultClasses.TimeStamps {
  // async validate(): Promise<void> {
  //   await schemaValidateOrReject(this);
  // }
}
