import { Resolver, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth-guard';
import { UserDto } from './dtos/user.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: void) => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlJwtAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => UserDto, { name: 'user' })
  async findOne(
    @Args('value') value: string,
    @Args('field', { type: () => String }) field: 'username' | 'email',
  ): Promise<UserDto | null> {
    return await this.usersService.findOne(value, field);
  }
}
