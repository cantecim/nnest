import { UserSchema } from './user.schema';

describe('UserSchema', () => {
  it('should be defined', () => {
    expect(new UserSchema()).toBeDefined();
  });
});
