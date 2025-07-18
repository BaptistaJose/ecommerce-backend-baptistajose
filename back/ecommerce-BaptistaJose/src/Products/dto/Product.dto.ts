import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ProductDto{
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsString()
    @MinLength(10)
    @MaxLength(500)
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    category: string;

    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}