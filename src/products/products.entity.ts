import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Products {
    
    @PrimaryGeneratedColumn('uuid')
    product_id: string
}