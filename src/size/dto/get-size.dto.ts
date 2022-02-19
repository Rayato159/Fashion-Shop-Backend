import { IsOptional } from "class-validator";

export class GetSizeDto {

    @IsOptional()
    size?: string
}