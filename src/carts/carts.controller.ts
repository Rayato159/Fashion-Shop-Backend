import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Carts } from './carts.entity';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
    constructor(private cartsService: CartsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createCart(
        @Request() { user_id }: any
    ): Promise<Carts> {
        return this.cartsService.createCart(user_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('user-cart')
    getCartByUser(
        @Request() { user_id }: any
    ): Promise<Carts> {
        return this.cartsService.getCartByUser(user_id)
    }
}
