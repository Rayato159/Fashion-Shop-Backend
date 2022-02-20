import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartsService } from './carts.service';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forFeature([
      CartsRepository,
    ])
  ],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
