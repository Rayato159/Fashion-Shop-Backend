import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'plain_color' })
export class PlainColor {

    @PrimaryGeneratedColumn('uuid')
    plain_color_id: string

    @Column()
    color: string

    @Column({ type: 'double precision' })
    price_factor: number
}