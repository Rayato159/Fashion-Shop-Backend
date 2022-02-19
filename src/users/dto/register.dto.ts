import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "../enums/roles.enum";

export class RegisterDto {

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    passwordConfirm: string

    @IsOptional()
    @IsEnum(Role)
    role?: Role
}