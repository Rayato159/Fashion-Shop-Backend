import { Payments } from "src/payments/payments.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payment_images' })
export class PaymentImages {

    @PrimaryGeneratedColumn('uuid')
    payment_image_id: string

    @Column()
    url: string

    @CreateDateColumn()
    created: string

    @OneToOne(() => Payments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    })
    payment: Payments
}