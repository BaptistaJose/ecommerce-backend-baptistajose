import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/Product.dto";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { RolGuard } from "src/guard/rol-guard/rol/rol.guard";
import { Roles } from "src/decorators/role/role.decorator";
import { Role } from "src/Users/enum/role.enum";

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
        @Roles(Role.Admin)
        @UseGuards(AuthGuard, RolGuard)
        updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() product: Partial< ProductDto>){
            return this.productsService.updateProduct(id, product);
        }

        @Delete('/:id')
        deleteProduct(@Param('id', new ParseUUIDPipe()) id: string){
            return this.productsService.deleteProduct(id);
        }
}