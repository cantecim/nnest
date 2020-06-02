import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@nnest/typeorm/models/base-entity';
import { Length, IsEmail, MinLength, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column()
  @Length(3, 20)
  name: string;

  @Index({ unique: true })
  @Column()
  @Length(3, 15)
  @IsString()
  username: string;

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
    [K in keyof User]: User[K] extends Function ? never : K;
  }[keyof User]
>;
export type UserEntityProperties = Partial<UserEntityPropertiesRequired>;
