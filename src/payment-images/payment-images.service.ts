import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { CreatePaymentImageDto } from './dto/create-payment-image.dto';
import { PaymentImages } from './payment-images.entity';
import { PaymentImagesRepository } from './payment-images.reposity';

@Injectable()
export class PaymentImagesService {
    constructor(
        @InjectRepository(PaymentImagesRepository)
        private paymentImagesRepository: PaymentImagesRepository,
        private paymentsService: PaymentsService,
    ) {}

    async uploadPaymentImage(file: Express.Multer.File, payment_id: string): Promise<PaymentImages> {
        try {
            const { path } = file
            const payment = await this.paymentsService.getPaymentById(payment_id)

            const paymentImage = this.paymentImagesRepository.create({
                url: path,
                payment,
            })
            return await this.paymentImagesRepository.save(paymentImage)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async setUrlPaymentImage(createPaymentImageDto: CreatePaymentImageDto, payment_id: string): Promise<PaymentImages> {
        try {
            const payment = await this.paymentsService.getPaymentById(payment_id)
            const { url } = createPaymentImageDto
            const paymentImage = this.paymentImagesRepository.create({
                url,
                payment,
            })
            return await this.paymentImagesRepository.save(paymentImage)
        } catch(e) {
            throw new BadRequestException()
        }
    }
}
