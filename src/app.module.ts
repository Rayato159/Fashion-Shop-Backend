import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlainColorModule } from './plain-color/plain-color.module';
import { PatternModule } from './pattern/pattern.module';
import { FigureModule } from './figure/figure.module';
import { GenderModule } from './gender/gender.module';
import { SizeModule } from './size/size.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentImagesModule } from './payment-images/payment-images.module';
import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      url: process.env.DATABASE_URL,
    }),

    // For dev without Docker

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       autoLoadEntities: true,
    //       synchronize: true,
    //       // url: process.env.DATABASE_URL,
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //     }
    //   }
    // }),
    
    UsersModule,
    AuthModule,
    PlainColorModule,
    PatternModule,
    FigureModule,
    GenderModule,
    SizeModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    PaymentImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
