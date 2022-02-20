
import { Products } from "src/products/products.entity";
import { Users } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./enums/order-status.enum";

@Entity({ name: 'orders' })
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    order_id: string

    @Column()
    address: string

    @ManyToMany(type => Products, { cascade: true, eager: true })
    @JoinTable({ 
        name: 'order_session',
        joinColumn: {
            name: "order_id",
            referencedColumnName: "order_id"
        },
        inverseJoinColumn: {
            name: "product_id"
        },
    })
    products: Products[]

    @Column({ default: OrderStatus.waiting })
    status: OrderStatus

    @CreateDateColumn()
    created: Date

    @ManyToOne(type => Users, user => user.orders, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user: Users
}