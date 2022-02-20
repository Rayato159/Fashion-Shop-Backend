import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    createProduct(
        @Body() createProductDto: CreateProductDto
    ): Promise<Products> {
        return this.productsService.createProduct(createProductDto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create-mass')
    createMassProducts(
        @Body() products: any[]
    ): Promise<Products[]> {
        return this.productsService.createMassProducts(products)
    }
}
