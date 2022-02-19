import { IsOptional } from "class-validator";
import { PriceSort } from "../enums/price-sort.enum";

export class getPlainColorDto {

    @IsOptional()
    color?: string

    @IsOptional()
    price?: PriceSort 
}