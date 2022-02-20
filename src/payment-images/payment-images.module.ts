import { Module } from '@nestjs/common';
import { PaymentImagesService } from './payment-images.service';
import { PaymentImagesController } from './payment-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentImagesRepository } from './payment-images.reposity';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    PaymentsModule,
    TypeOrmModule.forFeature([
      PaymentImagesRepository,
    ]),
  ],
  providers: [PaymentImagesService],
  controllers: [PaymentImagesController]
})
export class PaymentImagesModule {}
