import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreateSizeDto } from './dto/create-size.dto';
import { GetSizeDto } from './dto/get-size.dto';
import { Size } from './size.entity';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
    constructor(private sizeService: SizeService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    createSize(
        @Body() createSizeDto: CreateSizeDto,
    ): Promise<Size> {
        return this.sizeService.createSize(createSizeDto)
    }

    @Get()
    getSize(
        @Query() getSizeDto: GetSizeDto,
    ): Promise<Size[]> {
        return this.sizeService.getSize(getSizeDto)
    }

    @Get(':size_id')
    getSizeById(
        @Param('size_id') size_id: string,
    ): Promise<Size> {
        return this.sizeService.getSizebyId(size_id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':size_id/delete')
    deleteSize(
        @Param('size_id') size_id: string,
    ): Promise<Size> {
        return this.sizeService.deleteSize(size_id)
    }
}
