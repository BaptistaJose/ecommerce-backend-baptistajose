export class ProductDto{
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string | undefined;
}