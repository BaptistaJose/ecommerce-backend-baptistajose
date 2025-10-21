import { Order } from 'src/orders/entities/Order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name: string;

  @Column({ length: 50, nullable: false, type: 'varchar', unique: true })
  email: string;

  @Column({ length: 20, nullable: false, type: 'varchar' })
  password: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  country?: string | undefined;

  @Column({ type: 'varchar', length: 50 })
  city?: string | undefined;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];
}
