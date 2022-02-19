import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderRepository } from './gender.repository';
import { RolesGuard } from 'src/users/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GenderRepository,
    ]),
  ],
  providers: [GenderService, RolesGuard],
  controllers: [GenderController]
})
export class GenderModule {}
