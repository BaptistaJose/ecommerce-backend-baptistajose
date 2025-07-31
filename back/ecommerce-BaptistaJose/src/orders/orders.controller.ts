import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}

    @ApiBearerAuth()
    @Get('/:id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id') id:string){
        const orderDetail =  await this.ordersService.getOrder(id)
        return new OrderResponseDto(orderDetail)
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() createOrder: CreateOrderDto){
        const orderDetail = await this.ordersService.addOrder(createOrder);
        return new OrderResponseDto(orderDetail)
    }
}