import { Orders } from "src/orders/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payments' })
export class Payments {

    @PrimaryGeneratedColumn('uuid')
    payment_id: string

    @Column({ type: 'double precision' })
    price: number

    @Column()
    bank: string

    @CreateDateColumn()
    created: Date

    @OneToOne(() => Orders)
    @JoinColumn({ name: 'order_id' })
    order: Orders
}