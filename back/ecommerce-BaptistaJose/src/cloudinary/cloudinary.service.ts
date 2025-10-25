import {Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/Product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryRepository: CloudinaryRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    const fileUploade = await this.cloudinaryRepository.uploadImage(file);
    const productFound = await this.productRepository.findOneBy({ id });

    if (!productFound)
      throw new NotFoundException(`No existe el producto con el id: ${id}`);

    productFound.imgUrl = fileUploade.secure_url;
    await this.productRepository.save(productFound);

    return productFound;
  }
}
