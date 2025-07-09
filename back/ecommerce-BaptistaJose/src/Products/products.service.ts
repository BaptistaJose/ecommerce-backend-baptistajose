import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./dto/Product.dto";

@Injectable()
export class ProductsService{
    constructor(private readonly productsRepository: ProductsRepository){}
    
    getProducts(){
        return this.productsRepository.getProducts();
    }
    
    getProductById(id: number) {
        return this.productsRepository.getProductById(id);
    }
    
    createProduct(product: Product) {
        return this.productsRepository.createProduct(product);
    }
    
    updateProduct(id: number, product: Product) {
        return this.productsRepository.updateProduct(id, product);
    }
    
    deleteProduct(id: number) {
        return this.productsRepository.deleteProduct(id);
    }
}