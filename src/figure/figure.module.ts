import { Module } from '@nestjs/common';
import { FigureService } from './figure.service';
import { FigureController } from './figure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FigureRepository } from './figure.repository';
import { RolesGuard } from 'src/users/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FigureRepository,
    ]),
  ],
  providers: [FigureService, RolesGuard],
  controllers: [FigureController]
})
export class FigureModule {}
