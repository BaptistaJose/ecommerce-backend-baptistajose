import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/User.entity';
import { Order } from 'src/orders/entities/Order.entity';
import { OrderDetail } from 'src/orders/entities/OrderDetail.entity';
import { Product } from 'src/products/Product.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetail, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
