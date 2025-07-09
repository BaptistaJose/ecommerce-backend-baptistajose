import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./dto/Product.dto";

@Controller('products')
export class ProductsController{
        constructor(private readonly productsService: ProductsService){}
    
        @Get()
        getProducts(){
            return this.productsService.getProducts();
        }

        @Get(":id")
        getProductById(@Param('id') id: string){
            return this.productsService.getProductById(Number(id));
        }

        @Post("/register")
        createProduct(@Body() product: Product){
            return this.productsService.createProduct(product);
        }

        @Put('/:id')
        updateProduct(@Param('id') id: string, @Body() product:Product){
            return this.productsService.updateProduct(Number(id), product);
        }

        @Delete('/:id')
        deleteProduct(@Param('id') id: string){
            return this.productsService.deleteProduct(Number(id));
        }
}