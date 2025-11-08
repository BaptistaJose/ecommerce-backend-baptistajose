import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Product } from 'src/products/Product.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la orden',
    example: 'd0a5fcd1-9b5b-4b6c-8e0b-4afc79b53a92',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Listado de productos incluidos en la orden',
    example: [
      { id: '2530af78-3390-4bdd-86ac-439164df5855' },
      { id: '36a3fc92-52b0-4430-a739-14415818f006' },
    ]
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product[]>;
}
