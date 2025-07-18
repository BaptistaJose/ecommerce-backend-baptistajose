import { Injectable } from "@nestjs/common";
import { CloudinaryRepository } from "./cloudinary.repository";

@Injectable()
export class CloudinaryService {
    constructor (private readonly cloudinaryRepository: CloudinaryRepository){}

    async uploadImage(file: Express.Multer.File, id: string) {
        return this.cloudinaryRepository.uploadImage(file, id);
    }
}