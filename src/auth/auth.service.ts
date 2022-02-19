import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneUser(username)
        if(user && await bcrypt.compare(password, user.password)) {
            const { password, ...results } = user
            return results
        }
        return null
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            id: user.user_id,
            role: user.role,
        }
        return {
            ...payload,
            access_token: this.jwtService.sign(payload),
        }
    }
}
