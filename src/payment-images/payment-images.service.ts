import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentImagesRepository } from './payment-images.reposity';

@Injectable()
export class PaymentImagesService {
    constructor(
        @InjectRepository(PaymentImagesRepository)
        private paymentImagesRepository: PaymentImagesRepository
    ) {}
}
