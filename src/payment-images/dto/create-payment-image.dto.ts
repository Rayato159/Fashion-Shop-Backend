import { IsNotEmpty } from "class-validator";

export class CreatePaymentImageDto {

    @IsNotEmpty()
    url: string
}