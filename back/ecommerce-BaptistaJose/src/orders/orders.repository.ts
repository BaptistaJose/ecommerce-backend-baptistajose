import { Injectable, NotFoundException } from "@nestjs/common";
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

    let contador = 0;
    const validProducts: Product[] = [];

    for(let producto of products){
        const productId = await this.productService.getProductById(producto.id)

        if(!productId){
           throw new  NotFoundException(`El producto  con el id: ${producto.id} no existe`)
        }else if(productId.stock > 0 ){
            contador += Number(productId.price);
            const stock = Number(productId.stock - 1);
            
            await this.productService.updateProduct(productId.id, {stock})
            validProducts.push(productId)
        }else {
    console.log(`Producto sin stock: ${productId.name}`);
  }
       
    }

    const orderDetailEntity = new OrderDetail();
    orderDetailEntity.order = OrderEntity;
    orderDetailEntity.price = contador;
    orderDetailEntity.products = validProducts;
    
    await this.orderDetailRepository.save(orderDetailEntity);
    return orderDetailEntity;
    };
    

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