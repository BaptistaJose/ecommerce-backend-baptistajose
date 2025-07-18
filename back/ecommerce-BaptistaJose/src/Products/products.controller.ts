import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/Product.dto";

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
        getProductById(@Param('id', new ParseUUIDPipe()) id: string){
            return this.productsService.getProductById(id);
        }

        @Post("/register")
        createProduct(@Body() product: ProductDto){
            return this.productsService.createProduct(product);
        }

        @Put('/:id')
        updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() product: Partial< ProductDto>){
            return this.productsService.updateProduct(id, product);
        }

        @Delete('/:id')
        deleteProduct(@Param('id', new ParseUUIDPipe()) id: string){
            return this.productsService.deleteProduct(id);
        }
}