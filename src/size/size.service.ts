import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { GetSizeDto } from './dto/get-size.dto';
import { Size } from './size.entity';
import { SizeRepository } from './size.repository';

@Injectable()
export class SizeService {
    constructor(
        @InjectRepository(SizeRepository)
        private sizeReposiotry: SizeRepository,
    ) {}

    async createSize(createSizeDto: CreateSizeDto): Promise<Size> {
        try {
            const { size, price_factor } = createSizeDto
            const sizeCreated = this.sizeReposiotry.create({
                size: size.toLocaleUpperCase(),
                price_factor,
            })
            return await this.sizeReposiotry.save(sizeCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getSize(getSizeDto: GetSizeDto): Promise<Size[]> {
        try {
            const { size } = getSizeDto
            const query = this.sizeReposiotry.createQueryBuilder('size')
            if(size) {
                query.andWhere('(LOWER(size.size) LIKE LOWER(:size))', { size: `%${size}%` })
            }
            query.orderBy('size.size', 'ASC')

            const results = await query.getMany()
            if(results.length > 0){
                return results
            }
            throw new NotFoundException()
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getSizebyId(size_id: string): Promise<Size> {
        try {
            return await this.sizeReposiotry.findOne(size_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getSizeByKey(size: string): Promise<Size> {
        try {
            return await this.sizeReposiotry.findOne({ where: { size: size } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deleteSize(size_id: string): Promise<Size> {
        try {
            const size = await this.getSizebyId(size_id)
            await this.sizeReposiotry.delete(size_id)
            return size
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async createMassSize(sizes: any[]): Promise<Size[]>{
        let results: Size[] = []
        for(let i=0; i<sizes.length; i++) {
            let sizeCreated = this.sizeReposiotry.create({
                size: sizes[i].size,
                price_factor: sizes[i].price_factor
            })
            results.push(sizeCreated)
        }
        return await this.sizeReposiotry.save(results)
    }
}
