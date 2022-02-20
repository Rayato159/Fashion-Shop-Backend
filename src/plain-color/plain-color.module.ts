import { Module } from '@nestjs/common';
import { PlainColorService } from './plain-color.service';
import { PlainColorController } from './plain-color.controller';
import { RolesGuard } from 'src/users/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlainColorRepository } from './plain-color.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlainColorRepository,
    ]),
  ],
  providers: [PlainColorService, RolesGuard],
  controllers: [PlainColorController],
  exports: [PlainColorService]
})
export class PlainColorModule {}
