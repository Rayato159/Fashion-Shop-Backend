import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
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

    @Get(':product_id')
    getProductById(
        @Param('product_id') product_id: string,
    ): Promise<Products> {
        return this.productsService.getProductById(product_id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':product_id/delete')
    deleteProduct(
        @Param('product_id') product_id: string
    ): Promise<Products> {
        return this.productsService.deleteProduct(product_id)
    }
}
