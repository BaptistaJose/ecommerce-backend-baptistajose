import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";

@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}

    @Get('/:id')
    async getOrder(@Param('id') id:string){
        const orderDetail =  await this.ordersService.getOrder(id)
        return new OrderResponseDto(orderDetail)
    }

    @Post()
    async addOrder(@Body() createOrder: CreateOrderDto){
        const orderDetail = await this.ordersService.addOrder(createOrder);
        return new OrderResponseDto(orderDetail)
    }
}