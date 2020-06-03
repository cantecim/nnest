import { Resolver, Args, Query } from '@nestjs/graphql';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { classToPlain } from 'class-transformer';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@nnest/auth/guards/gql-jwt-auth-guard';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(returns => User, { name: 'user' })
  async findOne(@Args('value') value: string, @Args('field', { type: () => String }) field: 'username' | 'email') {
    const plainResult = classToPlain(await this.usersService.findOne(value, field));
    return plainResult;
  }

}
