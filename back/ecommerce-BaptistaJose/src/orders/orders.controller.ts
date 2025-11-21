import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dto/CreateOrder.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async addOrder(@Body() order: CreateOrderDto,@Req() req: any) {
    const userLogin = req.user.id
    const { userId, products } = order;
    return await this.ordersService.addOrder(userId, products, userLogin);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'ID de la orden' })
  async getOrder(@Param() id: string) {
    return await this.ordersService.getOrder(id);
  }
}
