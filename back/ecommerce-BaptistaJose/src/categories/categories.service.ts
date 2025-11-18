import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoryRepository) {}

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  async addCategories() {
    return await this.categoriesRepository.addCategories();
  }
}
