import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './Product.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(validPage: number, validLimit: number) {
    return await this.productsRepository.getProducts(validPage, validLimit);
  }

  async addProductSeeder(){
    return await this.productsRepository.addProductSeeder()
  }

  async deleteProduct(id:string) {
    return await this.productsRepository.deleteProduct(id);
  }

 async createProduct(product: Product) {
    return await this.productsRepository.createProduct(product);
  }

  async updateProduct(id:string, product: Product) {
    return await this.productsRepository.updateProduct(id,product);
  }

  async getProductById(id:string) {
    return await this.productsRepository.getProductById(id);
  }
}
