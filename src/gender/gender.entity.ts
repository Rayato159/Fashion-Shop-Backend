import { Products } from "src/products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'gender' })
export class Gender {

    @PrimaryGeneratedColumn('uuid')
    gender_id: string

    @Column({ unique: true })
    gender: string

    @Column({ type: 'double precision' })
    price_factor: number

    @OneToMany(type => Products, products => products.gender, {
        eager: false,
        nullable: true,
    })
    products: Products[]
}