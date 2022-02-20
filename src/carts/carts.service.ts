import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Carts } from './carts.entity';
import { CartsRepository } from './carts.repository';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(CartsRepository)
        private cartsRepository: CartsRepository,
        private usersService: UsersService,
        private productsService: ProductsService,
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

    async addItemToCart(user_id: string, updateCartDto: UpdateCartDto): Promise<Carts> {
        try {
            let cart = await this.getCartByUser(user_id)
            const { product_id } = updateCartDto
            const product = await this.productsService.getProductById(product_id)

            cart.products.push(product)
            return await this.cartsRepository.save(cart)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async removeItemFromCart(user_id: string, updateCartDto: UpdateCartDto): Promise<Carts> {
        try {
            let cart = await this.getCartByUser(user_id)
            const { product_id } = updateCartDto
            const product = await this.productsService.getProductById(product_id)

            for(let i=0; i<cart.products.length; i++) {
                if(JSON.stringify(cart.products[i]) === JSON.stringify(product)) {
                    cart.products.splice(i, 1)
                }
            }
            return await this.cartsRepository.save(cart)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getCartById(cart_id: string): Promise<Carts> {
        try {
            return await this.cartsRepository.findOne(cart_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deleteCart(cart_id: string): Promise<Carts> {
        try {
            const cart = await this.getCartById(cart_id)
            await this.cartsRepository.delete(cart_id)
            return cart
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
