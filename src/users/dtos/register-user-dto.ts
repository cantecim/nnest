import { UserDto } from "./user.dto";
import { Expose } from "class-transformer";

export class RegisterUserDto extends UserDto {
  @Expose()
  _id!: string;
}
