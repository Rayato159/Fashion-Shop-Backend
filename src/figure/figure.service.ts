import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceSort } from 'src/enums/price-sort.enum';
import { CreateFigureDto } from './dto/create-figure.dto';
import { GetFigureDto } from './dto/get-figure.dto';
import { Figure } from './figure.entity';
import { FigureRepository } from './figure.repository';

@Injectable()
export class FigureService {
    constructor(
        @InjectRepository(FigureRepository)
        private figureRepository: FigureRepository,
    ) {}

    async createFigure(createFigureDto: CreateFigureDto): Promise<Figure> {
        try {
            const { figure, price_factor } = createFigureDto
            const figureCreated = this.figureRepository.create({
                figure: figure.toLocaleLowerCase(),
                price_factor,
            })
            return await this.figureRepository.save(figureCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getFigure(getFigureDto: GetFigureDto): Promise<Figure[]> {
        try {
            const { figure, price } = getFigureDto
            const query = this.figureRepository
                .createQueryBuilder('figure')
                .orderBy('figure.figure', 'ASC')

            if(figure) {
                query.andWhere('(LOWER(figure.figure) LIKE LOWER(:figure))', { figure: `%${figure}%` })
            }
            if(price) {
                price === PriceSort.asc? query.orderBy('figure.price_factor', 'ASC'): query.orderBy('figure.price_factor', 'DESC')
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
}
