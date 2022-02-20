import { Controller, Post, UseGuards, Request, Body, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { GetProductsDto } from './products/dto/get-products.dto';
import { Products } from './products/products.entity';
import { ProductsService } from './products/products.service';
import { RegisterDto } from './users/dto/register.dto';
import { Users } from './users/users.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private usersService: UsersService,
    private authService: AuthService,
    private productsService: ProductsService,
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
    @Query() getProductsDto: GetProductsDto
  ): Promise<Products[]> {
    return this.productsService.getProductLists(getProductsDto)
  }
}
