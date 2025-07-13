import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
    exports: [CategoriesRepository]
})
export class CategoriesModule{}