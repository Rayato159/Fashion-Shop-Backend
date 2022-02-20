import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './order.entity';
import { OrdersRepsoitory } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersRepsoitory)
        private ordersRepository: OrdersRepsoitory,

        private cartsService: CartsService,
        private usersService: UsersService,
    ) {}

    async createOrder(createOrderDto: CreateOrderDto, user_id: string): Promise<Orders> {
        try {
            const { address } = createOrderDto
            const user  = await this.usersService.getUserById(user_id)
            const cart = await this.cartsService.getCartByUser(user_id)
            const products = await this.cartsService.getItemInCart(cart.cart_id)
            const order = this.ordersRepository.create({
                address,
                user,
                products
            })

            await this.cartsService.deleteCart(cart.cart_id)
            return await this.ordersRepository.save(order)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getOrders(): Promise<Orders[]> {
        try {
            return await this.ordersRepository.find()
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
