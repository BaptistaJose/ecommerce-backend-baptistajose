import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService{
    constructor(private readonly orderRepository: OrdersRepository){}


    getOrder(id:string) {
        return this.orderRepository.getOrder(id);
    }
    
    addOrder(createOrder: CreateOrderDto) {
        return this.orderRepository.addOrder(createOrder)
    }

}