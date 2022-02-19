import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { Pattern } from './pattern.entity';
import { PatternRepository } from './pattern.repository';

@Injectable()
export class PatternService {
    constructor(
        @InjectRepository(PatternRepository)
        private patternRepository: PatternRepository,
    ) {}

    async createPattern(createPatternDto: CreatePatternDto): Promise<Pattern> {
        try {
            try {
                const { pattern, price_factor } = createPatternDto
                const patternCreated = this.patternRepository.create({
                    pattern: pattern.toLocaleLowerCase(),
                    price_factor,
                })
                return await this.patternRepository.save(patternCreated)
            } catch(e) {
                throw new BadRequestException()
            }
        } catch(e) {
            throw new BadRequestException()
        }
    }
}
