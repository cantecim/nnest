import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoginDto {
  @ApiProperty({
    description: 'User email',
  })
  @Expose()
  email!: string;

  @ApiProperty({
    description: 'User password',
  })
  @Expose()
  password!: string;
}
