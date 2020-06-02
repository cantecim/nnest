import { JwtPayloadDto } from './jwt-payload-dto';

describe('JwtPayloadDto', () => {
  it('should be defined', () => {
    expect(new JwtPayloadDto()).toBeDefined();
  });
});
