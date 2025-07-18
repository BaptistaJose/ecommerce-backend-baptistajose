import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryRepository } from "./cloudinary.repository";
import { ProductsModule } from "src/Products/products.module";
import { cloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryController } from "./cloudinary.controller";

@Module({
    imports: [ProductsModule],
    controllers: [CloudinaryController],
    providers: [CloudinaryService, CloudinaryRepository, cloudinaryConfig],
    exports: [CloudinaryService]
})
export class CloudinaryModule {}