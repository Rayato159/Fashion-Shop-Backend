import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pattern' })
export class Pattern {

    @PrimaryGeneratedColumn('uuid')
    pattern_id: string

    @Column()
    pattern: string

    @Column({ type: 'double precision' })
    price_factor: number
}