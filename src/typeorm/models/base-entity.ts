import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { entityValidateOrReject } from '../helpers/entity-validate-or-reject';

@ObjectType({
  isAbstract: true
})
export abstract class BaseEntity extends TypeOrmBaseEntity {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await entityValidateOrReject(this);
  }
}
