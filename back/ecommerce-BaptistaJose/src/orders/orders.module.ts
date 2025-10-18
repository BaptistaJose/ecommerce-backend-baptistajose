import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/User.entity';
import { Order } from './Order.entity';
import { OrderDetail } from 'src/order-details/OrderDetail.entity';
import { Product } from 'src/products/Product.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports:[TypeOrmModule.forFeature([User,Order,OrderDetail,Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
