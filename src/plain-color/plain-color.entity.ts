import { Products } from "src/products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'plain_color' })
export class PlainColor {

    @PrimaryGeneratedColumn('uuid')
    plain_color_id: string

    @Column({ unique: true })
    color: string

    @Column({ type: 'double precision' })
    price_factor: number

    @OneToMany(type => Products, products => products.plain_color, {
        eager: false,
        nullable: true,
    })
    products: Products[]
}