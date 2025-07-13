import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { categories } from "src/seeds/seed-data";

@Injectable()
export class CategoriesService{
    constructor (private readonly categoriesRepository: CategoriesRepository){}

    async getCategories() {
        const categories = await this.categoriesRepository.getCategories()

        if(categories && categories.length > 0){
            return categories
        }

        return [];
    }
    
    async addCategories(){
        return await this.categoriesRepository.addCategories(categories)
    }
}