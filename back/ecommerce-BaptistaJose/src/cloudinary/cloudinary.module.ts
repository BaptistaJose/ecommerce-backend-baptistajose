import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryRepository } from './cloudinary.repository';
import { CloudinaryConfig } from '../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryRepository, CloudinaryConfig],
})
export class CloudinaryModule {}
