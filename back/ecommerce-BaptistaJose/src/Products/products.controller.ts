import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/Product.dto";
import { Product } from "./entities/products.entity";

@Controller('products')
export class ProductsController{
        constructor(private readonly productsService: ProductsService){}
    
        @Get()
        getProducts(){
            return this.productsService.getProducts();
        }

        @Get('/seeder')
        addProductsSeeder(){
            return this.productsService.addProductsSeeeder();
        }

        @Get(":id")
        getProductById(@Param('id') id: string){
            return this.productsService.getProductById(id);
        }

        @Post("/register")
        createProduct(@Body() product: Product){
            return this.productsService.createProduct(product);
        }

        @Put('/:id')
        updateProduct(@Param('id') id: string, @Body() product: Product){
            return this.productsService.updateProduct(id, product);
        }

        @Delete('/:id')
        deleteProduct(@Param('id') id: string){
            return this.productsService.deleteProduct(id);
        }
}