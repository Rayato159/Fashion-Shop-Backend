import { Test, TestingModule } from '@nestjs/testing';
import { PaymentImagesController } from './payment-images.controller';

describe('PaymentImagesController', () => {
  let controller: PaymentImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentImagesController],
    }).compile();

    controller = module.get<PaymentImagesController>(PaymentImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
