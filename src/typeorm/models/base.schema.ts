import { ObjectType } from '@nestjs/graphql';
import { entityValidateOrReject } from '../helpers/entity-validate-or-reject';
import { defaultClasses } from '@typegoose/typegoose';


@ObjectType({
  isAbstract: true
})
export class BaseSchema extends defaultClasses.TimeStamps {
  async validate(): Promise<void> {
    await entityValidateOrReject(this);
  }
}
