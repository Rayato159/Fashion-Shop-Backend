import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payment_images' })
export class PaymentImages {

    @PrimaryGeneratedColumn('uuid')
    payment_image_id: string

    @Column()
    url: string

    @CreateDateColumn()
    created: string
}