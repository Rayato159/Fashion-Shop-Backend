import { Products } from "src/products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'figure' })
export class Figure {

    @PrimaryGeneratedColumn('uuid')
    figure_id: string

    @Column({ unique: true })
    figure: string

    @Column({ type: 'double precision' })
    price_factor: number

    @OneToMany(type => Products, products => products.figure, {
        eager: false
    })
    products: Products[]
}