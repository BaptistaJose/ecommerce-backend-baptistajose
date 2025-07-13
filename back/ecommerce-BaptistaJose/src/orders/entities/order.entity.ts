import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/Users/enitities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column({type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @OneToOne(()=> OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail;
}