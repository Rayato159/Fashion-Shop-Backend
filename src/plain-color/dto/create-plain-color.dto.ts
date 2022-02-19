import { IsNotEmpty } from "class-validator";

export class CreatePlainColorDto {

    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    price_factor: number
}