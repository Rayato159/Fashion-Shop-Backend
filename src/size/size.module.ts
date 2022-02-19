import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeRepository } from './size.repository';
import { RolesGuard } from 'src/users/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SizeRepository,
    ]),
  ],
  providers: [SizeService, RolesGuard],
  controllers: [SizeController]
})
export class SizeModule {}
