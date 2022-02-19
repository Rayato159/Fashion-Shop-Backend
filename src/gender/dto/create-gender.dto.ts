import { IsNotEmpty } from "class-validator";

export class CreateGenderDto {

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    price_factor: number
}