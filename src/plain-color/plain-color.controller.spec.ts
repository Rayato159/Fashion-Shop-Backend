import { Test, TestingModule } from '@nestjs/testing';
import { PlainColorController } from './plain-color.controller';

describe('PlainColorController', () => {
  let controller: PlainColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlainColorController],
    }).compile();

    controller = module.get<PlainColorController>(PlainColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
