import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async addOrder(userId: string, products: Partial<Product[]>) {
    if (!products.length)
      throw new BadRequestException(
        'No se puede crear una orden sin productos',
      );
    return await this.orderRepository.addOrder(userId, products);
  }

  async getOrder(id: string) {
    return await this.orderRepository.getOrder(id);
  }
}
