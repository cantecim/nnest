import { BaseSchema } from './base.schema';

describe('BaseEntity', () => {
  it('should be defined', () => {
    expect(new BaseSchema()).toBeDefined();
  });
});
