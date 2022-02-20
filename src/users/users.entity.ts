import { Orders } from "src/orders/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(type => Orders, orders => orders.user)
    orders: Orders[]
}