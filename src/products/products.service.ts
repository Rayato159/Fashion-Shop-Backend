import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FigureService } from 'src/figure/figure.service';
import { GenderService } from 'src/gender/gender.service';
import { PatternService } from 'src/pattern/pattern.service';
import { PlainColorService } from 'src/plain-color/plain-color.service';
import { SizeService } from 'src/size/size.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsRepository)
        private productsRepository: ProductsRepository,

        private plainColorService: PlainColorService,
        private patternService: PatternService,
        private figureService: FigureService,
        private sizeService: SizeService,
        private genderService: GenderService,
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Products> {
        try {

            const {
                color,
                pattern,
                figure,
                size,
                gender,
                price
            } = createProductDto

            // Find all field in database
            const colorFound = await this.plainColorService.getPlainColorByKey(color)
            const patternFound = await this.patternService.getPatternByKey(pattern)
            const figureFound = await this.figureService.getFigureByKey(figure)
            const sizeFound = await this.sizeService.getSizeByKey(size)
            const genderFound = await this.genderService.getGenderByKey(gender)

            // Price calculate
            const newPrice = price * colorFound.price_factor * patternFound.price_factor * figureFound.price_factor * sizeFound.price_factor * genderFound.price_factor

            const productCreated = this.productsRepository.create({
                plain_color: colorFound,
                pattern: patternFound,
                figure: figureFound,
                size: sizeFound,
                gender: genderFound,
                price:Math.ceil(newPrice)
            })
            return await this.productsRepository.save(productCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async createMassProducts(products: any[]): Promise<Products[]>{
        let results: Products[] = []
        for(let i=0; i<products.length; i++) {
            // Find all field in database
            let colorFound = await this.plainColorService.getPlainColorByKey(products[i].color)
            let patternFound = await this.patternService.getPatternByKey(products[i].pattern)
            let figureFound = await this.figureService.getFigureByKey(products[i].figure)
            let sizeFound = await this.sizeService.getSizeByKey(products[i].size)
            let genderFound = await this.genderService.getGenderByKey(products[i].gender)

            // Price calculate
            let newPrice = products[i].price * colorFound.price_factor * patternFound.price_factor * figureFound.price_factor * sizeFound.price_factor * genderFound.price_factor

            let productCreated = this.productsRepository.create({
                plain_color: colorFound,
                pattern: patternFound,
                figure: figureFound,
                size: sizeFound,
                gender: genderFound,
                price:Math.ceil(newPrice)
            })
            results.push(productCreated)
        }
        return await this.productsRepository.save(results)
    }   
}
