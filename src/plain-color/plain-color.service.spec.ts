import { Test, TestingModule } from '@nestjs/testing';
import { PlainColorService } from './plain-color.service';

describe('PlainColorService', () => {
  let service: PlainColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlainColorService],
    }).compile();

    service = module.get<PlainColorService>(PlainColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
