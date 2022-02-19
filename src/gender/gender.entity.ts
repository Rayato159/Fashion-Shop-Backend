import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'gender' })
export class Gender {

    @PrimaryGeneratedColumn('uuid')
    gender_id: string

    @Column({ unique: true })
    gender: string

    @Column({ type: 'double precision' })
    price_factor: number
}