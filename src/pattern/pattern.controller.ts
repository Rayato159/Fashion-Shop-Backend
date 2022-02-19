import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreatePatternDto } from './dto/create-pattern.dto';
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
}
