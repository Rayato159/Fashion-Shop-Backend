import { Products } from "src/products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'size' })
export class Size {

    @PrimaryGeneratedColumn('uuid')
    size_id: string

    @Column({ unique: true })
    size: string

    @Column({ type: 'double precision' })
    price_factor: number

    @OneToMany(type => Products, products => products.size, {
        eager: false
    })
    products: Products[]
}