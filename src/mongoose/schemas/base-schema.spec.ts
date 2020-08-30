import { BaseSchema } from './base.schema';

describe('BaseSchema', () => {
  it('should be defined', () => {
    expect(new BaseSchema()).toBeDefined();
  });
});
