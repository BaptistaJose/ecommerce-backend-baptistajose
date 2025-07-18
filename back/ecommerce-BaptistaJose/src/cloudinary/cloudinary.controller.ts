import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";

@Controller('/files')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
    
    @Post('/uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 200000, message: 'El archivo es demasiado grande, debe ser menor a 200KB' }),
            new FileTypeValidator({fileType: /^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/webp|image\/svg\+xml)$/i})
        ]
    })) file: Express.Multer.File, @Param('id') id: string) {
        return this.cloudinaryService.uploadImage(file, id);
    }
}