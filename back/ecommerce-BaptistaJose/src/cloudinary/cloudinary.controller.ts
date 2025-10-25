import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Superas el peso maximo de 200kb',
          }),
          new FileTypeValidator({fileType: /(.jpg|.png|.svg|.webp|.jpeg)/})
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.cloudinaryService.uploadImage(id, file);
  }
}
