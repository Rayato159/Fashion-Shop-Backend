import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreateFigureDto } from './dto/create-figure.dto';
import { GetFigureDto } from './dto/get-figure.dto';
import { Figure } from './figure.entity';
import { FigureService } from './figure.service';

@Controller('figure')
export class FigureController {
    constructor(private figureService: FigureService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    createPattern(
        @Body() createFigureDto: CreateFigureDto,
    ): Promise<Figure> {
        return this.figureService.createFigure(createFigureDto)
    }

    @Get()
    getFigure(
        @Query() getFigureDto: GetFigureDto
    ): Promise<Figure[]> {
        return this.figureService.getFigure(getFigureDto)
    }
}