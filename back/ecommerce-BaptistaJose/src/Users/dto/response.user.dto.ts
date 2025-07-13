export class OrderSummaryDto {
  id: string;
  date: Date;

  constructor(order: Partial<OrderSummaryDto>) {
    this.id = order.id || '';
    this.date = order.date || new Date();
  }
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;

  orders: OrderSummaryDto[];

  constructor(user: Partial<UserResponseDto> & { orders?: any[] }) {
    this.id = user.id || '';
    this.name = user.name || '';
    this.email = user.email || '';
    this.address = user.address || '';
    this.phone = user.phone || '';
    this.country = user.country;
    this.city = user.city;

    this.orders = (user.orders || []).map(order => new OrderSummaryDto(order));
  }
}
