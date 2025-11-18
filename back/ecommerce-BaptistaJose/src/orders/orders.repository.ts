import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  async addOrder(userId: string, products: Partial<Product[]>) {
    
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        const user = await entityManager.findOne(User, {
          where: { id: userId },
        });
        if (!user)
          throw new NotFoundException(
            `el usuario con el id ${userId} no existe`,
          );

        const order = new Order();
        order.user = user;
        order.date = new Date();

        const newOrder = await entityManager.save(Order, order);

        let productsArray: Product[] = await Promise.all(
          products.map(async (elemento: Product) => {
            const product = await entityManager.findOne(Product, {
              where: { id: elemento.id },
            });
            if (!product)
              throw new NotFoundException(
                `Producto con id: ${elemento.id} no encontrado`,
              );

            if (product.stock <= 0)
              throw new BadRequestException(
                `No hay stock del producto: ${product.name}`,
              );

            product.stock -= 1;

            await entityManager.save(Product, product);
            return product;
          }),
        );

        const total = productsArray.reduce(
          (sum: number, product: Product) => sum + Number(product.price),
          0,
        );

        const orderDetail = new OrderDetail();
        orderDetail.order = newOrder;
        orderDetail.products = productsArray;
        orderDetail.price = total;

        await entityManager.save(OrderDetail, orderDetail);
        return await entityManager.findOne(Order, {
          where: { id: newOrder.id },
          relations: { orderDetails: { products: true } },
        });
      },
    );
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { orderDetails: { products: true } },
    });
    if (!order)
      throw new NotFoundException(`la orden con el id: ${id} no existe`);

    return order;
  }
}
