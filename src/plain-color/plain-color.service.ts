import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { CreatePlainColorDto } from './dto/create-plain-color.dto';
import { getPlainColorDto } from './dto/get-plain-color.dto';
import { PriceSort } from './enums/price-sort.enum';
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
            const { color, price_factor } = createPlainColorDto
            const plainColor = this.plainColorReposiotry.create({
                color: color.toLocaleLowerCase(),
                price_factor,
            })
            return await this.plainColorReposiotry.save(plainColor)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getPlainColor(getPlainColorDto: getPlainColorDto): Promise<PlainColor[]> {
        try {
            const { color, price } = getPlainColorDto
            const query = this.plainColorReposiotry
                .createQueryBuilder('plain_color')
                .orderBy('plain_color.color', 'ASC')

            if(color) {
                query.andWhere('(LOWER(plain_color.color) LIKE LOWER(:color))', { color: `%${color}%` })
            }
            if(price) {
                price === PriceSort.asc? query.orderBy('plain_color.price_factor', 'ASC'): query.orderBy('plain_color.price_factor', 'DESC')
            }

            return await query.getMany()
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getPlainColorById(plain_color_id: string): Promise<PlainColor> {
        try {
            return await this.plainColorReposiotry.findOne(plain_color_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deletePlainColor(plain_color_id: string): Promise<PlainColor> {
        try {
            const plainColor = await this.getPlainColorById(plain_color_id)
            await this.plainColorReposiotry.delete(plain_color_id)
            return plainColor
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
