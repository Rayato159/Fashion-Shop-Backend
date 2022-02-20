import { Module } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { PatternController } from './pattern.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternRepository } from './pattern.repository';
import { RolesGuard } from 'src/users/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatternRepository,
    ]),
  ],
  providers: [PatternService, RolesGuard],
  controllers: [PatternController],
  exports: [PatternService]
})
export class PatternModule {}
