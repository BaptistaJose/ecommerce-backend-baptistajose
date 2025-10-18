import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/Category.entity';
import {productsMock} from "../utils/productsMock"

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async getProducts(validPage: number, validLimit: number) {
    const start = (validPage - 1) * validLimit
    const end = start + validLimit;

    const products = await this.productRepository.find({
      relations:{
        category: true
      }
    })

    return products.slice(start, end)
  }

  
  async addProductSeeder(){
    const categories = await this.categoryRepository.find()
    await Promise.all(
      productsMock.map(async (producto)=>{
        const category = categories.find((category) => category.name === producto.category) 
        
        if(!category) throw new Error(`la categoria ${producto.category} no existe`)
          
          const product = new Product();
          product.name = producto.name;
          product.description = producto.description;
          product.price = producto.price;
          product.stock = producto.stock;
          product.category = category;
          
          await this.productRepository.createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'],['name'])
          .execute()
        })
    )

    return 'Precargar de products finalizada con exito';
  }
  
  async updateProduct(id: string, product: Product) {
    const productFound = await this.productRepository.findOneBy({id})
    if(!productFound) return `El producto no existe`;
     await this.productRepository.update(id,product);
    return id
  }
  
  async createProduct(product: Omit<Product, 'id'>) {
      const productCreate = await this.productRepository.create(product);
    const productSave = await this.productRepository.save(productCreate);
    return productSave.id;
  }
  
  async deleteProduct(id:string) {
      const productFound = await this.productRepository.findOneBy({id})
    if(!productFound) return `El producto no existe`;
    await this.productRepository.remove(productFound);
    return id
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({id})
    if(!product) return `El producto no existe`;
    return product
  }
}
