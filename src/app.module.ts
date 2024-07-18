import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entites/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Product } from './entites/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ImageUploadService } from './services/image-upload.service'; // Add this import

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Danikeyz5741',
        database: 'postgres',
        entities: [User, Product],
        synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Product]),
  ],
  controllers: [UserController, ProductController],
  providers: [UserService, ProductService, ImageUploadService], // Add ImageUploadService
})
export class AppModule {}
