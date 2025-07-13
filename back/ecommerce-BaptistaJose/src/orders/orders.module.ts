import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { UsersModule } from "src/Users/users.module";
import { ProductsModule } from "src/Products/products.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail]), UsersModule, ProductsModule],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}