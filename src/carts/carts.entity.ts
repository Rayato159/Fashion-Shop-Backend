import { Products } from "src/products/products.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carts' })
export class Carts {

    @PrimaryGeneratedColumn('uuid')
    cart_id: string

    @OneToOne(() => Users, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: Users

    @ManyToMany(() => Products)
    @JoinTable({ 
        name: 'cart_session',
        joinColumn: {
            name: "cart_id",
            referencedColumnName: "cart_id"
        },
        inverseJoinColumn: {
            name: "product_id",
            referencedColumnName: "product_id"
        },
    })
    products: Products[]
}