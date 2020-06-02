import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from './type-orm-config-service.service';

describe('TypeOrmConfigServiceService', () => {
  let service: TypeOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmConfigService],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
