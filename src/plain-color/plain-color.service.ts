import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlainColorDto } from './dto/create-plain-color.dto';
import { PlainColor } from './plain-color.entity';
import { PlainColorRepository } from './plain-color.repository';

@Injectable()
export class PlainColorService {
    constructor(
        @InjectRepository(PlainColorRepository)
        private plainColorReposiotry: PlainColorRepository,
    ) {}

    async createPlainColor(createPlainColorDto: CreatePlainColorDto): Promise<PlainColor> {
        try {
            const plainColor = this.plainColorReposiotry.create({
                ...createPlainColorDto
            })
            return await this.plainColorReposiotry.save(plainColor)
        } catch(e) {
            throw new BadRequestException()
        }
    }
}
