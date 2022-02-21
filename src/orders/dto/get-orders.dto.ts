import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";

export class GetOrdersDto {

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus

    @IsOptional()
    start?: Date

    @IsOptional()
    end?: Date
}