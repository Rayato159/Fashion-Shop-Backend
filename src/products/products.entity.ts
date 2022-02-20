import { Carts } from "src/carts/carts.entity";
import { Figure } from "src/figure/figure.entity";
import { Gender } from "src/gender/gender.entity";
import { Orders } from "src/orders/order.entity";
import { Pattern } from "src/pattern/pattern.entity";
import { PlainColor } from "src/plain-color/plain-color.entity";
import { Size } from "src/size/size.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Products {
    
    @PrimaryGeneratedColumn('uuid')
    product_id: string

    @ManyToOne(type => PlainColor, plain_color => plain_color.products, {
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'plain_color_id' })
    plain_color: PlainColor

    @ManyToOne(type => Pattern, pattern => pattern.products, {
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'pattern_id' })
    pattern: Pattern

    @ManyToOne(type => Figure, figure => figure.products, {
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'figure_id' })
    figure: Figure

    @ManyToOne(type => Size, size => size.products, {
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'size_id' })
    size: Size

    @ManyToOne(type => Gender, gender => gender.products, {
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'gender_id' })
    gender: Gender

    @ManyToMany(type => Carts, carts => carts.products)
    carts: Carts[]

    @ManyToMany(type => Orders, orders => orders.products)
    orders: Orders[]

    @Column({ type: 'double precision' })
    price: number
}