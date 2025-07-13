import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Product } from "src/Products/entities/products.entity";

export class OrderResponseDto {
  id: string;
  price: number;
  products: { id: string; name: string; price: number }[];
  order: {
    id: string;
    date: Date;
    user: {
      id: string;
    };
  };

  constructor(orderDetail: OrderDetail) {
    this.id = orderDetail.id;
    this.price = orderDetail.price;

    this.products = orderDetail.products?.map((product: Product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    })) || [];

    this.order = {
      id: orderDetail.order.id,
      date: orderDetail.order.date,
      user: {
        id: orderDetail.order.user.id,
      },
    };
  }
}
