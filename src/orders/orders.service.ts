import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CartsService } from 'src/carts/carts.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderStatus } from './enums/order-status.enum';
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

            const order = this.ordersRepository.create({
                address,
                user,
                products: cart.products
            })

            await this.cartsService.deleteCart(cart.cart_id)
            return await this.ordersRepository.save(order)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getOrders(getOrdersDto: GetOrdersDto, query: PaginateQuery): Promise<Paginated<Orders>> {
        try {
            const {
                start,
                end,
                status,
                limits,
            } = getOrdersDto
            const filter = this.ordersRepository.createQueryBuilder('orders')
                .orderBy('orders.created', 'DESC')

            if(status) {
                filter.andWhere('(orders.status = LOWER(:status))', { status })
            }
            if(start && end) {
                filter.andWhere('(orders.created >= :start AND orders.created <= :end)', { start, end })
            }

            // Return in pagation
            const results = await paginate<Orders>(query, filter, {
                sortableColumns: [
                    'order_id',
                    'status',
                    'created',
                ],
                maxLimit: limits
            })
            return results
            throw new NotFoundException()
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getOrderById(order_id: string): Promise<Orders> {
        try {
            return await this.ordersRepository.findOne(order_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async updateOrderStatus(order_id: string): Promise<Orders> {
        try {
            const order = await this.getOrderById(order_id)
            order.status = OrderStatus.purchased
            return await this.ordersRepository.save(order)
        } catch(e) {
            throw new BadRequestException()
        }
    }
}
