import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryRepository } from './cloudinary.repository';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/Product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryRepository, CloudinaryConfig],
})
export class CloudinaryModule {}
