import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Carts } from './carts.entity';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';

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

    @UseGuards(JwtAuthGuard)
    @Patch('add')
    addItemToCart(
        @Request() { user_id }: any,
        @Body() updateCartDto: UpdateCartDto,
    ): Promise<Carts> {
        return this.cartsService.addItemToCart(user_id, updateCartDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('remove')
    removeItemFromCart(
        @Request() { user_id }: any,
        @Body() updateCartDto: UpdateCartDto,
    ): Promise<Carts> {
        return this.cartsService.removeItemFromCart(user_id, updateCartDto)
    }
}
