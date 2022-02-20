import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Carts } from './carts.entity';
import { CartsRepository } from './carts.repository';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(CartsRepository)
        private cartsRepository: CartsRepository,
        private usersService: UsersService,
    ) {}

    async createCart(user_id: string): Promise<Carts> {
        try {
            const user = await this.usersService.getUserById(user_id)
            const cartCreated = this.cartsRepository.create({
                user
            })
            return await this.cartsRepository.save(cartCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getCartByUser(user_id: string): Promise<Carts> {
        try {
            const user = await this.usersService.getUserById(user_id)
            return await this.cartsRepository.findOne({ where: { user } })
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
