import { Category } from "src/categories/entities/category.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    imageUrl: string = 'https://res.cloudinary.com/ditvxwaqx/image/upload/v1752806284/ktshlk7wojoycqupl9zu.webp';

    @ManyToOne(()=> Category, (category)=> category.products)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @ManyToMany(()=> OrderDetail, (orderDetail)=> orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}