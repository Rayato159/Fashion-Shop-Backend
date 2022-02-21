import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreatePlainColorDto } from './dto/create-plain-color.dto';
import { GetPlainColorDto } from './dto/get-plain-color.dto';
import { PlainColor } from './plain-color.entity';
import { PlainColorService } from './plain-color.service';

@Controller('plain-color')
export class PlainColorController {
    constructor(
        private plainColorService: PlainColorService,
    ) {}
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    createPlainColor(
        @Body() createPlainColorDto: CreatePlainColorDto,
    ): Promise<PlainColor> {
        return this.plainColorService.createPlainColor(createPlainColorDto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create-mass')
    createMassPlainColor(
        @Body() colors: any[]
    ): Promise<PlainColor[]> {
        return this.plainColorService.createMassPlainColor(colors)
    }

    @Get()
    getPlainColor(
        @Query() getPlainColorDto: GetPlainColorDto
    ): Promise<PlainColor[]> {
        return this.plainColorService.getPlainColor(getPlainColorDto)
    }

    @Get(':color')
    getPlainColorByKey(
        @Param('color') color: string,
    ): Promise<PlainColor> {
        return this.plainColorService.getPlainColorByKey(color)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':plain_color_id/delete')
    deletePlainColor(
        @Param('plain_color_id') plain_color_id: string,
    ): Promise<PlainColor> {
        return this.plainColorService.deletePlainColor(plain_color_id)
    }
}
