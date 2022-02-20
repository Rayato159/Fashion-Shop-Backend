import { IsNotEmpty } from "class-validator";

export class CreateCartDto {

    @IsNotEmpty()
    user_id: string
}