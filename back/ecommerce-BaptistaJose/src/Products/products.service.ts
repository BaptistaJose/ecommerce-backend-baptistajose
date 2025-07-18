import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "./dto/Product.dto";
import { products } from "src/seeds/seed-data";
import { Product } from "./entities/products.entity";
import { CategoriesRepository } from "src/categories/categories.repository";

@Injectable()
export class ProductsService{
    
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly categoryRepository: CategoriesRepository
    ){}
    
    async getProducts(){
        return await this.productsRepository.getProducts();
    }
    
    async getProductById(id: string) {
        return await this.productsRepository.getProductById(id);
    }
    
    async createProduct(productDto: ProductDto) {
      const category = await this.categoryRepository.findOneBy(productDto.category);

      if (!category) throw new NotFoundException('Categoría no válida');

      const productToSave: Partial<Product> = {
        ...productDto,
        category,
      };

      return this.productsRepository.createProduct(productToSave);
    }
    
    async updateProduct(id: string, product: Partial< ProductDto>) { 
        const {category, ...props} = product;
        let productUpdate: Partial<Product> = {...props};
        
        if (category) {
            const categoryRepository = await this.categoryRepository.findOneBy(category);

            if (!categoryRepository) {
                throw new NotFoundException('Categoría no válida');
            }
            productUpdate.category = categoryRepository;
        } 

        return await this.productsRepository.updateProduct(id, productUpdate);
    }
    
    async deleteProduct(id: string) {
        return await this.productsRepository.deleteProduct(id);
    }

    async addProductsSeeeder() {
       return await this.productsRepository.addProductsSeeder(products);
    }
}