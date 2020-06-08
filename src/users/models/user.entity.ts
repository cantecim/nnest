import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@nnest/typeorm/models/base-entity';
import { Length, IsEmail, MinLength, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column()
  @Length(3, 20)
  name: string;

  @Field()
  @Index({ unique: true })
  @Column()
  @Length(3, 15)
  @IsString()
  username: string;

  @Field()
  @Index({ unique: true })
  @Column()
  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @MinLength(8)
  password: string;
}

export type UserEntityPropertiesRequired = Pick<
  User,
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof User]: User[K] extends Function ? never : K;
  }[keyof User]
>;
export type UserEntityProperties = Partial<UserEntityPropertiesRequired>;
