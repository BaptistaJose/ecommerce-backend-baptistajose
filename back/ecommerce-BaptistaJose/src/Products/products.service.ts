import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "./dto/Product.dto";
import { products } from "src/seeds/seed-data";
import { Product } from "./entities/products.entity";

@Injectable()
export class ProductsService{
    
    constructor(private readonly productsRepository: ProductsRepository){}
    
    async getProducts(){
        return await this.productsRepository.getProducts();
    }
    
    async getProductById(id: string) {
        return await this.productsRepository.getProductById(id);
    }
    
    async createProduct(product: Product) {
        return await this.productsRepository.createProduct(product);
    }
    
    async updateProduct(id: string, product: Partial< Product>) {
        return await this.productsRepository.updateProduct(id, product);
    }
    
    async deleteProduct(id: string) {
        return await this.productsRepository.deleteProduct(id);
    }

    async addProductsSeeeder() {
       return await this.productsRepository.addProductsSeeder(products);
    }
}