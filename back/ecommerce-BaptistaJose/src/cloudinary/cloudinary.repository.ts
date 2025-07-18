import { BadRequestException, Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import { ProductsService } from "src/Products/products.service";
import  toStream = require("buffer-to-stream");

@Injectable()
export class CloudinaryRepository {
    constructor(
        private readonly ProductsService: ProductsService,
       
    ){}

    async uploadImage(file: Express.Multer.File, id: string): Promise<UploadApiResponse> {

        return new Promise((resolve, reject)=>{
            const upload = v2.uploader.upload_stream({resource_type: 'auto'}, (error, result)=>{

                if (error) {

                    reject(error);

                }else if(!result) {

                    return reject(new BadRequestException("No se pudo subir la imagen, intente nuevamente"));
                }
                 else {
                    this.ProductsService.updateProduct(id, {imageUrl: result.secure_url})
                    .then(()=> resolve(result))
                    .catch((err) => reject(err));
                }
            })
            toStream(file.buffer).pipe(upload);
        })
    }
}