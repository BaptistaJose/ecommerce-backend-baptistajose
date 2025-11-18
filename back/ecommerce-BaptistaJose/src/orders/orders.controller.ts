import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dto/CreateOrder.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return await this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'ID de la orden' })
  async getOrder(@Param() id: string) {
    return await this.ordersService.getOrder(id);
  }
}
