import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsUUID,
  IsPositive,
  Min,
  Length,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    example: 'Auriculares inalámbricos',
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del producto',
    example: 'Auriculares Bluetooth con cancelación de ruido.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio del producto',
    example: 129.99,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    description: 'Stock disponible',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @ApiPropertyOptional({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}