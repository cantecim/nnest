import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  it('should be defined', () => {
    // TODO : Needs AuthService mock
    expect(new LocalStrategy({} as any)).toBeDefined();
  });
});
