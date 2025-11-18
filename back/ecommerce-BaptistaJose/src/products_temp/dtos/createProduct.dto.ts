import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsUrl,
  IsUUID,
  IsPositive,
  Min,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Auriculares inalámbricos',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Auriculares Bluetooth con cancelación de ruido.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 129.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en stock',
    example: 50,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto (opcional)',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}