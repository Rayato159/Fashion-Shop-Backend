import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FigureModule } from 'src/figure/figure.module';
import { GenderModule } from 'src/gender/gender.module';
import { PatternModule } from 'src/pattern/pattern.module';
import { PlainColorModule } from 'src/plain-color/plain-color.module';
import { SizeModule } from 'src/size/size.module';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RolesGuard } from 'src/users/roles.guard';

@Module({
  imports: [
    PlainColorModule,
    PatternModule,
    FigureModule,
    SizeModule,
    GenderModule,
    TypeOrmModule.forFeature([
      ProductsRepository,
    ]),
  ],
  providers: [ProductsService, RolesGuard],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
