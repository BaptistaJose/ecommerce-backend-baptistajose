import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserUpdateDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    example: 'juanperez@mail.com',
  })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nueva contraseña (debe ser segura)',
    example: 'MiNuevaPass@2025',
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @ApiPropertyOptional({
    description: 'Dirección del usuario',
    example: 'Av. Siempre Viva 742',
  })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del usuario',
    example: '+54 11 5555-5555',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'País del usuario',
    example: 'Argentina',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Ciudad del usuario',
    example: 'Buenos Aires',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description:
      'Indica si el usuario es administrador (no debe modificarse manualmente)',
    example: false,
  })
  @IsEmpty()
  isAdmin: boolean;
}
