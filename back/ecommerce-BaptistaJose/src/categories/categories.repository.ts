import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository{
    constructor (@InjectRepository(Category) private category: Repository<Category>){}
    
    async getCategories(): Promise<Category[]> {
        return this.category.find();
    };

async addCategories(categories: string[]): Promise<void> {

  for (const name of categories) {
    const exists = await this.category.findOne({ where: { name } });
    if (!exists) {
      const newCategory = this.category.create({ name });
      await this.category.save(newCategory);

    }
  }
}
}