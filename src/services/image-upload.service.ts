import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Multer } from 'multer';
// import { Multer } from 'multer'; // Add this import

@Injectable()
export class ImageUploadService {
    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    // @ts-ignore
    async uploadImage(file: Multer.File): Promise<string> { // Fix type here
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
    }
}
