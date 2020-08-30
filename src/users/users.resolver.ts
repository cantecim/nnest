import { Resolver, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@nnest/auth/guards/gql-jwt-auth-guard';
import { UserDto } from "./dtos/user.dto";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// TODO : Resolver açıp denemek lazım
// @Resolver(of => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlJwtAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => UserDto, { name: 'user' })
  async findOne(@Args('value') value: string, @Args('field', { type: () => String }) field: 'username' | 'email'): Promise<UserDto | null> {
    return await this.usersService.findOne(value, field);
  }

}
