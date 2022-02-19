import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enums/roles.enum";

@Entity({ name: 'users' })
export class Users {

    @PrimaryGeneratedColumn('uuid')
    user_id: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ default: Role.User })
    role: Role
}