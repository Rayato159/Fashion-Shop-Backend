import { IsEnum, IsOptional } from "class-validator";
import { PriceSort } from "../../enums/price-sort.enum";

export class GetPlainColorDto {

    @IsOptional()
    color?: string

    @IsOptional()
    @IsEnum(PriceSort)
    price?: PriceSort 
}