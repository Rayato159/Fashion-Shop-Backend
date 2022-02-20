import { Test, TestingModule } from '@nestjs/testing';
import { PaymentImagesService } from './payment-images.service';

describe('PaymentImagesService', () => {
  let service: PaymentImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentImagesService],
    }).compile();

    service = module.get<PaymentImagesService>(PaymentImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
