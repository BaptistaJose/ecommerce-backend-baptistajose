import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/order-details/OrderDetail.entity';
import { Product } from 'src/products/Product.entity';
import { User } from 'src/users/User.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async addOrder(userId: string, products: Product[]) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) return `el usuario con el id ${userId} no existe`;

    const order = new Order();
    order.user = user;
    order.date = new Date();

    const newOrder = await this.ordersRepository.save(order);

    let productsArray: Product[];
    try {
      productsArray = await Promise.all(
        products.map(async (elemento: Product) => {
          const product = await this.productRepository.findOneBy({
            id: elemento.id,
          });
          if (!product)
            throw new Error(`Producto con id: ${elemento.id} no encontrado`);

          await this.productRepository.update(
            { id: elemento.id },
            { stock: product.stock - 1 },
          );

          return product;
        }),
      );
    } catch (err) {
      return err instanceof Error ? err.message : 'Error procesando productos';
    }

    const total = productsArray.reduce(
      (sum: number, product: Product) => sum + Number(product.price),
      0,
    );

    const orderDetail = new OrderDetail();
    orderDetail.order = newOrder;
    orderDetail.products = productsArray;
    orderDetail.price = total;

    await this.orderDetailRepository.save(orderDetail);
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { orderDetails:{products: true} },
    });
    if (!order) return `la orden con el id: ${id} no existe`;

    return order;
  }
}
