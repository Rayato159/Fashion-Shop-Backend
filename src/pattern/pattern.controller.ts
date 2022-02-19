import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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

    @Get()
    getPattern(
        @Query() getPatternDto: GetPatternDto,
    ): Promise<Pattern[]> {
        return this.patternService.getPattern(getPatternDto)
    }
}
