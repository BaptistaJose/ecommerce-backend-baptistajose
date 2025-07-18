import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/Users/enitities/users.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.orders, {onDelete: 'CASCADE'})
    user: User;

    @Column({type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @OneToOne(()=> OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}