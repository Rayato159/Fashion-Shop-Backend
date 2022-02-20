import { IsOptional } from "class-validator";

export class GetProductsDto {

    @IsOptional()
    gender?: string

    @IsOptional()
    color?: string

    @IsOptional()
    pattern?: string

    @IsOptional()
    figure?: string
    
    @IsOptional()
    size?: string

    @IsOptional()
    limits: number
}