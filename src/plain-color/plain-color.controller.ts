import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/users/enums/roles.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { CreatePlainColorDto } from './dto/create-plain-color.dto';
import { PlainColor } from './plain-color.entity';
import { PlainColorService } from './plain-color.service';

@Controller('plain-color')
export class PlainColorController {
    constructor(
        private plainColorService: PlainColorService,
    ) {}
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('/create')
    createPlainColor(
        @Body() createPlainColorDto: CreatePlainColorDto,
    ): Promise<PlainColor> {
        return this.plainColorService.createPlainColor(createPlainColorDto)
    }
}
