import { Products } from "src/products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pattern' })
export class Pattern {

    @PrimaryGeneratedColumn('uuid')
    pattern_id: string

    @Column()
    pattern: string

    @Column({ type: 'double precision' })
    price_factor: number

    @OneToMany(type => Products, products => products.pattern, {
        eager: false,
        nullable: true,
    })
    products: Products[]
}