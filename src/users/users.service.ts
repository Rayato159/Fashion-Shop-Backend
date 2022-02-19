import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';
import *  as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}
    
    async register(registerDto: RegisterDto): Promise<Users> {
        try {
            const { username, password, passwordConfirm } = registerDto
            // Check if not match password with password-confirm
            if(password !== passwordConfirm) {
                throw new BadRequestException()
            }

            // Let's hash the password (Salt = 10)
            const hash = await bcrypt.hashSync(password, 10)

            const user = this.usersRepository.create({
                username,
                password: hash,
            })
            return await this.usersRepository.save(user)
        } catch(e) {
            throw new BadRequestException({
                message: 'Please check your password or password-confirm.'
            })
        }
    }

    async findOneUser(username: string): Promise<Users | undefined> {
        return await this.usersRepository.findOne({ where: { username } })
    }
}
