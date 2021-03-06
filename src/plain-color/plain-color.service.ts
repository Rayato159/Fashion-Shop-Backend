import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlainColorDto } from './dto/create-plain-color.dto';
import { GetPlainColorDto } from './dto/get-plain-color.dto';
import { PriceSort } from '../enums/price-sort.enum';
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
            const plainColorCreated = this.plainColorReposiotry.create({
                color: color.toLocaleLowerCase(),
                price_factor,
            })
            return await this.plainColorReposiotry.save(plainColorCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getPlainColor(getPlainColorDto: GetPlainColorDto): Promise<PlainColor[]> {
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

            const results = await query.getMany()
            if(results.length > 0) {
                return results
            }
            throw new NotFoundException()
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

    async getPlainColorByKey(color: string): Promise<PlainColor> {
        try {
            return await this.plainColorReposiotry.findOne({ where: { color: color } })
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

    async createMassPlainColor(colors: any[]): Promise<PlainColor[]>{
        let results: PlainColor[] = []
        for(let i=0; i<colors.length; i++) {
            let plainColorCreated = this.plainColorReposiotry.create({
                color: colors[i].color,
                price_factor: colors[i].price_factor
            })
            results.push(plainColorCreated)
        }
        return await this.plainColorReposiotry.save(results)
    }
}
