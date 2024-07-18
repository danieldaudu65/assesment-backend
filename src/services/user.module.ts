import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
// @ts-ignore
import { User } from '../entites/product.entity'; // Adjust the path accordingly

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService], // Export UserService to be used in other modules if needed
})
export class UserModule {}
