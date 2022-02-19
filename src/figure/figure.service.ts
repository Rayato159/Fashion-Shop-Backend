import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFigureDto } from './dto/create-figure.dto';
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
}
