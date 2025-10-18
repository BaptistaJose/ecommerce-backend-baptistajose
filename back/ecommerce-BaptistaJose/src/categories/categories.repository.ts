import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./Category.entity";
import {productsMock} from "../utils/productsMock"

@Injectable()
export class CategoryRepository{
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async getCategories(){
        return await this.categoryRepository.find()
    }

    async addCategories(){
      await Promise.all(productsMock.map(async (ele) =>{
            await this.categoryRepository.createQueryBuilder()
            .insert()
            .into(Category)
            .values({name: ele.category})
            .orIgnore()
            .execute()
        })) 

        return "Categorias insertadas";
    }
}