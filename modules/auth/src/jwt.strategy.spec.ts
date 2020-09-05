import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('should be defined', () => {
    // TODO : Need ConfigService mock
    expect(new JwtStrategy({} as any)).toBeDefined();
  });
});
