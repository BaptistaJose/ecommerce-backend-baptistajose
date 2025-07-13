import { Product } from "src/Products/entities/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50})
    name:string;

    @OneToMany(()=> Product, (product)=> product.category)
    products: Product[]
}