import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersRepsoitory } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    CartsModule,
    TypeOrmModule.forFeature([
      OrdersRepsoitory,
    ]),
  ],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
