import { Controller, Post, UseGuards, Request, Body, Get, Query, Param } from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { CreateOrderDto } from './orders/dto/create-order.dto';
import { Orders } from './orders/order.entity';
import { OrdersService } from './orders/orders.service';
import { CreatePaymentDto } from './payments/dto/create-payment.dto';
import { Payments } from './payments/payments.entity';
import { PaymentsService } from './payments/payments.service';
import { GetProductsDto } from './products/dto/get-products.dto';
import { Products } from './products/products.entity';
import { ProductsService } from './products/products.service';
import { RegisterDto } from './users/dto/register.dto';
import { Users } from './users/users.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private paymentsService: PaymentsService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<Users> {
    return this.usersService.register(registerDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Get('product-lists')
  getProductLists(
    @Query() getProductsDto: GetProductsDto,
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<Products>> {
    return this.productsService.getProductLists(getProductsDto, query)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Request() { user_id }: any,
  ): Promise<Orders> {
    return this.ordersService.createOrder(createOrderDto, user_id)
  }

  // Just for dev
  @Get('orders/get')
  getOrders(): Promise<Orders[]> {
    return this.ordersService.getOrders()
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('payment')
  createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Param('order_id') order_id: string,
  ): Promise<Payments> {
    return this.paymentsService.createPayment(createPaymentDto, order_id)
  }
}
