import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
    return await this.productsService.getProducts(validPage, validLimit);
  }
  @Get('seeder')
  async addProductSeeder() {
    return await this.productsService.addProductSeeder();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return await this.productsService.updateProduct(id, product);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }
}
