import { Module } from '@nestjs/common';
import { FigureService } from './figure.service';
import { FigureController } from './figure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FigureRepository } from './figure.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FigureRepository,
    ]),
  ],
  providers: [FigureService],
  controllers: [FigureController]
})
export class FigureModule {}
