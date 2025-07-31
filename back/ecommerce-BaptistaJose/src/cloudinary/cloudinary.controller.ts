import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { AuthGuard } from "src/guard/auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('/files')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
    
    @ApiBearerAuth()
    @Post('/uploadImage/:id')
    @UseGuards(AuthGuard)
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