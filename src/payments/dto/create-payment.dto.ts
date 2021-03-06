import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    bank: string
}