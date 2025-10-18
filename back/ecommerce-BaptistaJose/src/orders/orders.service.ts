import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/products/Product.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly orderRepository: OrdersRepository){}

    async addOrder(userId: string, products: Product[]){
        return await this.orderRepository.addOrder(userId, products)
    }

    async getOrder(id: string){
        return await this.orderRepository.getOrder(id)
    }
}
