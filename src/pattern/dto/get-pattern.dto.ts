import { IsEnum, IsOptional } from "class-validator";
import { PriceSort } from "../../enums/price-sort.enum";

export class GetPatternDto {

    @IsOptional()
    pattern?: string

    @IsOptional()
    @IsEnum(PriceSort)
    price?: PriceSort
}