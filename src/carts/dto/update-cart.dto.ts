import { IsNotEmpty } from "class-validator";

export class UpdateCartDto {

    @IsNotEmpty()
    product_id: string
}