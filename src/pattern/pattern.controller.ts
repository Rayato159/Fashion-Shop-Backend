import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { GetPatternDto } from './dto/get-pattern.dto';
import { Pattern } from './pattern.entity';
import { PatternService } from './pattern.service';

@Controller('pattern')
export class PatternController {
    constructor(private patternService: PatternService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create')
    createPattern(
        @Body() createPatternDto: CreatePatternDto,
    ): Promise<Pattern> {
        return this.patternService.createPattern(createPatternDto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('create-mass')
    createMassPattern(
        @Body() patterns: any[]
    ): Promise<Pattern[]> {
        return this.patternService.createMassPattern(patterns)
    }

    @Get()
    getPattern(
        @Query() getPatternDto: GetPatternDto,
    ): Promise<Pattern[]> {
        return this.patternService.getPattern(getPatternDto)
    }

    @Get(':pattern')
    getPatternByKey(
        @Param('pattern') pattern: string 
    ): Promise<Pattern> {
        return this.patternService.getPatternByKey(pattern)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':pattern_id/delete')
    deletePattern(
        @Param('pattern_id') pattern_id: string 
    ): Promise<Pattern> {
        return this.patternService.deletePattern(pattern_id)
    }
}
