import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payments } from './payments.entity';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(PaymentsRepository)
        private paymentsRepository: PaymentsRepository,
        private ordersService: OrdersService,
    ) {}

    async createPayment(createPaymentDto: CreatePaymentDto, order_id: string): Promise<Payments> {
        try {
            const order = await this.ordersService.getOrderById(order_id)
            const { price, bank } = createPaymentDto

            const payment = this.paymentsRepository.create({
                price,
                bank,
            })
            return await this.paymentsRepository.save(payment)
        } catch(e) {
            throw new BadRequestException()
        }
    }
}
