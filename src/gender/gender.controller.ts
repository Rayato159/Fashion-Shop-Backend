import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './gender.entity';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {
    constructor(private genderService: GenderService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    createGender(
        @Body() createGenderDto: CreateGenderDto,
    ): Promise<Gender> {
        return this.genderService.createGender(createGenderDto)
    }

    @Get()
    getGender(): Promise<Gender[]> {
        return this.genderService.getGender()
    }

    @Get(':gender')
    getGenderByKey(
        @Param('gender') gender: string,
    ): Promise<Gender> {
        return this.genderService.getGenderByKey(gender)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':gender_id/delete')
    deleteGender(
        @Param('gender_id') gender_id: string,
    ): Promise<Gender> {
        return this.genderService.deleteGender(gender_id)
    }
}
