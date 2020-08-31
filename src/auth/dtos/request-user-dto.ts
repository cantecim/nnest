import { Expose } from 'class-transformer';
// import { UserEntityPropertiesRequired } from 'src/users/models/user.entity';

// export type RequestUserDto = Pick<UserEntityPropertiesRequired, Extract<keyof UserEntityPropertiesRequired, keyof {
//   username: string;
//   id: number;
// }>>;

export class RequestUserDto {
  @Expose()
  username!: string;

  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  name!: string;
}
