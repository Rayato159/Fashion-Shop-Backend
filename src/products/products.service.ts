import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FigureService } from 'src/figure/figure.service';
import { GenderService } from 'src/gender/gender.service';
import { PatternService } from 'src/pattern/pattern.service';
import { PlainColorService } from 'src/plain-color/plain-color.service';
import { SizeService } from 'src/size/size.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
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
                price: Math.ceil(newPrice)
            })
            results.push(productCreated)
        }
        return await this.productsRepository.save(results)
    }

    async getProductLists(getProductsDto: GetProductsDto, query: PaginateQuery): Promise<Paginated<Products>> {
        try {
            const {
                gender,
                color,
                pattern,
                figure,
                size,
                limits
            } = getProductsDto

            // Filter logic
            const filter = this.productsRepository.createQueryBuilder('products')
                .leftJoinAndSelect('products.gender', 'gender')
                .leftJoinAndSelect('products.plain_color', 'plain_color')
                .leftJoinAndSelect('products.pattern', 'pattern')
                .leftJoinAndSelect('products.figure', 'figure')
                .leftJoinAndSelect('products.size', 'size')

            if(gender) {
                filter.andWhere('(gender.gender = LOWER(:gender))', { gender })
            }
            if(color) {
                filter.andWhere('(plain_color.color = LOWER(:color))', { color })
            }
            if(pattern) {
                filter.andWhere('(pattern.pattern = LOWER(:pattern))', { pattern })
            }
            if(figure) {
                filter.andWhere('(figure.figure = LOWER(:figure))', { figure })
            }
            if(size) {
                filter.andWhere('(size.size = UPPER(:size))', { size })
            }

            // Return in pagation
            const results = await paginate<Products>(query, filter, {
                sortableColumns: [
                    'product_id',
                    'gender',
                    'plain_color',
                    'pattern',
                    'figure',
                    'figure',
                    'size'
                ],
                maxLimit: limits
            })
            return results
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getProductById(product_id: string): Promise<Products> {
        try {
            return await this.productsRepository.findOne(product_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deleteProduct(product_id: string): Promise<Products> {
        try {
            const product = await this.getProductById(product_id)
            await this.productsRepository.delete(product_id)
            return product
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
