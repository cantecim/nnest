import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({
  isAbstract: true
})
export abstract class BaseEntity extends TypeOrmBaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: string;

  @Field(type => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
