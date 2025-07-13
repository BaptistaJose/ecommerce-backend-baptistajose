import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/Products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class OrderDetail{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @OneToOne(()=> Order, (order)=> order.orderDetail)
    @JoinColumn()
    order: Order;

    @ManyToMany(()=> Product, (product)=> product.orderDetails)
    products: Product[];
}
