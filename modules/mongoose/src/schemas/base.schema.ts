import { ObjectType } from '@nestjs/graphql';
import { schemaValidateOrReject } from '../helpers/schema-validate-or-reject';
import { defaultClasses, DocumentType, getClassForDocument, post, pre } from '@typegoose/typegoose';
import { Error as _MongooseError } from 'mongoose';
import { SchemaDuplicateRecordException } from "../exceptions/schema-duplicate-record.exception";
import { MongoException } from "../exceptions/mongo.exception";

type MongooseError = _MongooseError & { code?: number, keyValue: Record<string, string> };

@ObjectType({
  isAbstract: true,
})
@pre<BaseSchema>('save', async function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  if(this.$isSingleNested || this.$isSchemaMap || this.$isArraySubdocument || this.$isDocumentArrayElement) {
    return;
  }
  await schemaValidateOrReject(getClassForDocument(this), this);
})
@post<BaseSchema>('save', function (
  error: MongooseError,
  doc: DocumentType<any>,
  next: any,
) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new SchemaDuplicateRecordException(error.keyValue));
  } else if(error.name === "MongoError") {
    next(new MongoException(error.name, error.code));
  } else {
    next()
  }
})
export class BaseSchema extends defaultClasses.TimeStamps {
  // async validate(): Promise<void> {
  //   await schemaValidateOrReject(this);
  // }
}
