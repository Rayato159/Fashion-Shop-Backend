import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    pattern: string

    @IsNotEmpty()
    figure: string

    @IsNotEmpty()
    size: string

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    price: number
}