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

    async getFigureById(figure_id: string): Promise<Figure> {
        try {
            return await this.figureRepository.findOne(figure_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getFigureByKey(figure: string): Promise<Figure> {
        try {
            return await this.figureRepository.findOne({ where: { figure: figure } })
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deleteFigure(figure_id: string): Promise<Figure> {
        try {
            const figure = await this.getFigureById(figure_id)
            await this.figureRepository.delete(figure_id)
            return figure
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async createMassFigure(figures: any[]): Promise<Figure[]>{
        let results: Figure[] = []
        for(let i=0; i<figures.length; i++) {
            let figureCreated = this.figureRepository.create({
                figure: figures[i].figure,
                price_factor: figures[i].price_factor
            })
            results.push(figureCreated)
        }
        return await this.figureRepository.save(results)
    }
}
