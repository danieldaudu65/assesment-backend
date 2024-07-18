import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entites/product.entity'; // Adjust the path accordingly
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    // Fetch all products from the database
    async findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }

    // Find a product by its ID
    async findOne(id: number): Promise<Product> {
        return this.productRepo.findOne({ where: { id } });
    }

    // Create a new product
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepo.create(createProductDto as any);
        // @ts-ignore
        return this.productRepo.save(product);
    }

    // Update an existing product
    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.productRepo.update(id, updateProductDto as any);
        return this.productRepo.findOne({ where: { id } });
    }

    // Delete a product by its ID
    async remove(id: number): Promise<void> {
        await this.productRepo.delete(id);
    }
}
