import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './gender.entity';
import { GenderRepository } from './gender.repository';

@Injectable()
export class GenderService {
    constructor(
        @InjectRepository(GenderRepository)
        private genderRepository: GenderRepository,
    ) {}

    async createGender(createGenderDto: CreateGenderDto): Promise<Gender> {
        try {
            const { gender, price_factor } = createGenderDto
            const genderCreated = this.genderRepository.create({
                gender,
                price_factor,
            })
            return await this.genderRepository.save(genderCreated)
        } catch(e) {
            throw new BadRequestException()
        }
    }

    async getGender(): Promise<Gender[]> {
        try {
            const genderFound = await this.genderRepository.find()
            if(genderFound.length > 0) {
                return genderFound
            }
            throw new NotFoundException()
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async getGenderById(gender_id: string): Promise<Gender> {
        try {
            return await this.genderRepository.findOne(gender_id)
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async deleteGender(gender_id: string): Promise<Gender> {
        try {
            const gender = await this.getGenderById(gender_id)
            await this.genderRepository.delete(gender)
            return gender
        } catch(e) {
            throw new NotFoundException()
        }
    }
}
