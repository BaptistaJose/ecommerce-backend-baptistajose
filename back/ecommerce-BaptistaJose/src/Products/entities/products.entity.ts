import { Category } from "src/categories/entities/category.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"products"})
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 50, nullable: false })
    name: string;
    
    @Column({ type: 'text', nullable: false })
    description: string;
    
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;
    
    @Column({ type: 'int', nullable: false })
    stock: number;
    
    @Column()
    imageUrl: string = 'http://example.com/default-image.png';

    @ManyToOne(()=> Category, (category)=> category.products)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @ManyToMany(()=> OrderDetail, (orderDetail)=> orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[];
}