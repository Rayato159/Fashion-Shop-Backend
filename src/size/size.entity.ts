import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'size' })
export class Size {

    @PrimaryGeneratedColumn('uuid')
    size_id: string

    @Column({ unique: true })
    size: string

    @Column({ type: 'double precision' })
    price_factor: number
}