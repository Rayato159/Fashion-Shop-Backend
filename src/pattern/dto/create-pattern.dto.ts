import { IsNotEmpty } from "class-validator";

export class CreatePatternDto {

    @IsNotEmpty()
    pattern: string

    @IsNotEmpty()
    price_factor: number
}