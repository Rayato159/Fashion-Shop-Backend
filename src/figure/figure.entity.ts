import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'figure' })
export class Figure {

    @PrimaryGeneratedColumn('uuid')
    figure_id: string

    @Column({ unique: true })
    figure: string

    @Column({ type: 'double precision' })
    price_factor: number
}