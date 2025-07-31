import { Order } from "src/orders/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/role.enum";

@Entity({name:"users"})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50, nullable: false})
    name: string;
    
    @Column({length: 50, unique: true, nullable: false})
    email: string;
    
    @Column({nullable: false})
    password: string;
    
    @Column({type: 'text'})
    address: string;
    
    @Column()
    phone: string;
    
    @Column({length: 50, nullable: true})
    country?: string;
    
    @Column({length: 50, nullable: true})
    city?: string ;

    @OneToMany(()=> Order, (order) => order.user)
    orders: Order[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column(
    {type: 'enum',
    enum: Role,
    default: Role.User,})
    role: Role;
}