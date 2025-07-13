import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users"})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50, nullable: false})
    name: string;
    
    @Column({length: 50, unique: true, nullable: false})
    email: string;
    
    @Column({length: 20, nullable: false})
    password: string;
    
    @Column({type: 'text'})
    address: string;
    
    @Column()
    phone: string;
    
    @Column({length: 50})
    country: string;
    
    @Column({length: 50})
    city: string ;

    @OneToMany(()=> Order, (order) => order.user)
    orders: Order[];
}