import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/products.entity";
import { Repository } from "typeorm";
import { Category } from "src/categories/entities/category.entity";

@Injectable()
export class ProductsRepository {
    
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}
    
    
    async getProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }
    
    async getProductById(id: string): Promise<Product| null> {
        return await this.productRepository.findOneBy({id});
    }
    
    async createProduct(product: Product): Promise<Product> {
        const newProduct = await this.productRepository.create(product);
        await this.productRepository.save(newProduct);
        return newProduct;
    }
    
    async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
        const productFound = await this.productRepository.findOneBy({id});
        
        if (!productFound) {
            throw new NotFoundException("Producto no encontrado");
        }
        
        Object.assign(productFound, product)
      return  await this.productRepository.save(productFound)
      
    }
    
    async deleteProduct(id: string): Promise<string> {
        const product = await this.productRepository.findOneBy({id})
        
        if (!product) {
            throw new NotFoundException("Producto no encontrado");
        }
        
        await this.productRepository.delete(id)
        
        return product.id
        
        }

        async addProductsSeeder(products: { name: string; description: string; price: number; stock: number; category: string; }[]) {
            
            for(let prop of products){
                const productFound = await this.productRepository.findOneBy({name: prop.name})

                if(!productFound) {
                    const categoryFound = await this.categoryRepository.findOne({where:{name: prop.category}})

                    if(!categoryFound){
                        continue;
                    }

                   const product = await this.productRepository.create({name: prop.name, description: prop.description, price: prop.price, stock: prop.stock, category: categoryFound});
                   await this.productRepository.save(product)
                }
                
            }
        }
    }