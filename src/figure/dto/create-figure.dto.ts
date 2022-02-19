import { IsNotEmpty } from "class-validator";

export class CreateFigureDto {

    @IsNotEmpty()
    figure: string

    @IsNotEmpty()
    price_factor: number
}