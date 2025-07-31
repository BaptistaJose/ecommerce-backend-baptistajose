import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/Users/users.service";
import { ProductsService } from "src/Products/products.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Product } from "src/Products/entities/products.entity";

@Injectable()
export class OrdersRepository{
    constructor (@InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
     @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,

){}
    
    async addOrder(createOrder: CreateOrderDto){
    const {userId, products} = createOrder;
    
    const user = await this.usersService.getUserById(userId)

    const OrderEntity = await this.ordersRepository.save(this.ordersRepository.create({
        user: user,
        date: new Date()
    })) 

    const uniqueProducts = new Map<string, boolean>();
    const stockUpdates: { id: string, newStock: number }[] = [];
    let totalPrice = 0;
    const validProducts: Product[] = [];

for (let producto of products) {
  if (uniqueProducts.has(producto.id)) {
    throw new BadRequestException(`El producto con id ${producto.id} fue enviado más de una vez`);
  }
  uniqueProducts.set(producto.id, true);

  const productEntity = await this.productService.getProductById(producto.id);
  if (!productEntity) {
    throw new NotFoundException(`El producto con id ${producto.id} no existe`);
  }

  if (productEntity.stock <= 0) {
    throw new BadRequestException(`El producto ${productEntity.name} no tiene stock disponible`);
  }

  totalPrice += Number(productEntity.price);
  stockUpdates.push({ id: productEntity.id, newStock: productEntity.stock - 1 });
  validProducts.push(productEntity);
}

for (let { id, newStock } of stockUpdates) {
  await this.productService.updateProduct(id, { stock: newStock });
}

const orderDetailEntity = new OrderDetail();
orderDetailEntity.order = OrderEntity;
orderDetailEntity.price = totalPrice;
orderDetailEntity.products = validProducts;

await this.orderDetailRepository.save(orderDetailEntity);
return orderDetailEntity;
}  

async getOrder(id: string) {
  const orderDetail = await this.orderDetailRepository.findOne({
    where: {
      order: { id }
    },
    relations: ['order', 'order.user', 'products']
  });

  if (!orderDetail) {
    throw new NotFoundException(`La orden con el ID ${id} no existe.`);
  }

  return orderDetail;
}

}