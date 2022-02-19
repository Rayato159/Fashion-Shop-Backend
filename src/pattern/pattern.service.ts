import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceSort } from 'src/enums/price-sort.enum';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { GetPatternDto } from './dto/get-pattern.dto';
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
            const { pattern, price_factor } = createPatternDto
            const patternCreated = this.patternRepository.create({
                pattern: pattern.toLocaleLowerCase(),
                price_factor,
            })
            return await this.patternRepository.save(patternCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getPattern(getPatternDto: GetPatternDto): Promise<Pattern[]> {
        try {
            const { pattern, price } = getPatternDto
            const query = this.patternRepository
                .createQueryBuilder('pattern')
                .orderBy('pattern.pattern', 'ASC')

            if(pattern) {
                query.andWhere('(LOWER(pattern.pattern) LIKE LOWER(:pattern))', { pattern: `%${pattern}%` })
            }
            if(price) {
                price === PriceSort.asc? query.orderBy('pattern.price_factor', 'ASC'): query.orderBy('pattern.price_factor', 'DESC')
            }

            const results = await query.getMany()
            if(results.length > 0) {
                return results
            }
            throw new NotFoundException()
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getPatternById(pattern_id: string): Promise<Pattern> {
        try {
            return await this.patternRepository.findOne(pattern_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getPatternByKey(pattern: string): Promise<Pattern> {
        try {
            return await this.patternRepository.findOne({ where: { pattern: pattern } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deletePattern(pattern_id: string): Promise<Pattern> {
        try {
            const pattern = await this.patternRepository.findOne(pattern_id)
            await this.patternRepository.delete(pattern_id)
            return pattern
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
