import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/products.entity";
import { ProductsRepository } from "./products.repository";
import { Category } from "src/categories/entities/category.entity";
import { CategoriesRepository } from "src/categories/categories.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    providers:[ProductsService, ProductsRepository, CategoriesRepository],
    controllers:[ProductsController],
    exports: [ProductsService, ProductsRepository],
})
export class ProductsModule{}