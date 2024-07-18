import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ImageUploadService } from '../services/image-upload.service';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly imageUploadService: ImageUploadService,
    ) { }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            const imageUrl = await this.imageUploadService.uploadImage(file);
            // @ts-ignore
            createProductDto.imageUrl = imageUrl;
        }
        return this.productService.create(createProductDto);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            const imageUrl = await this.imageUploadService.uploadImage(file);
            // @ts-ignore
            updateProductDto.imageUrl = imageUrl;
        }
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }
}
