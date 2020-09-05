import { GqlJwtAuthGuard } from './gql-jwt-auth-guard';

describe('GqlJwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new GqlJwtAuthGuard()).toBeDefined();
  });
});
