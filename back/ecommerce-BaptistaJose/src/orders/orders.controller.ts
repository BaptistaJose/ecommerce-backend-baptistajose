import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

      @Post()
      async addOrder(@Body() order: any){
        const {userId, products} = order
          return await this.ordersService.addOrder(userId, products)
      }
      
      @Get(':id')
      async getOrder(@Param() id: string){
          return await this.ordersService.getOrder(id)
      }
}
