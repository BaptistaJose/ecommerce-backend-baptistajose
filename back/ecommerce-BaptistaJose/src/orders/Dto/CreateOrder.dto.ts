import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Product } from 'src/products/Product.entity';

export class CreateOrderDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product[]>;
}
