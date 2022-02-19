import { IsEnum, IsOptional } from "class-validator";
import { PriceSort } from "src/enums/price-sort.enum";

export class GetFigureDto {

    @IsOptional()
    figure?: string

    @IsOptional()
    @IsEnum(PriceSort)
    price?: PriceSort
}