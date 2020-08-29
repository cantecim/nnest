import { UserModel } from './user.model';

describe('UserModel', () => {
  it('should be defined', () => {
    expect(new UserModel()).toBeDefined();
  });
});
