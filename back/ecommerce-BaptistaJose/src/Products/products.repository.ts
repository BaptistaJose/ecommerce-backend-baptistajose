import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./dto/Product.dto";

@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        {
            id: 1,
            name: "Product 1",
            description: "Description of Product 1",
            price: 100,
            category: "Category 1",
            stock: 50,
            imageUrl: "https://example.com/product1.jpg"
        },
        {
            id: 2,
            name: "Product 2",
            description: "Description of Product 2",
            price: 200,
            category: "Category 1",
            stock: 30,
            imageUrl: "https://example.com/product2.jpg"
        },
        {
            id: 3,
            name: "Product 3",
            description: "Description of Product 3",
            price: 150,
            category: "Category 2",
            stock: 20,
            imageUrl: "https://example.com/product3.jpg"
        }
    ];
    
    async getProducts(): Promise<Product[]> {
        return this.products;
    }
    
    async getProductById(id: number): Promise<Product | undefined> {
        return this.products.find(product => product.id === id);
    }
    
    async createProduct(product: Product): Promise<Product> {
        const newId = this.products.length > 0
        ? Math.max(...this.products.map(u => u.id)) + 1
        : 1;
        
        product.id = newId;
        this.products.push(product)
        return product;
    }
    
    async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        const index = this.products.findIndex(p => p.id === id);
        
        if (index === -1) {
            throw new NotFoundException("Producto no encontrado");
        }
        
        this.products[index] = { ...this.products[index], ...product };
        
        return this.products[index];
    }
   
    async deleteProduct(id: number): Promise<number> {
        const index = this.products.findIndex(p => p.id === id);
        
        if (index === -1) {
            throw new NotFoundException("Producto no encontrado");
        }

        this.products.splice(index, 1);

        return id;
    }
}