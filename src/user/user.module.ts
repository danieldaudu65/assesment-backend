import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entites/user.entity'; // Ensure correct path to entity
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Register the User entity with TypeOrmModule
    ],
    providers: [UserService], // Declare UserService as a provider
    controllers: [UserController], // Declare UserController as a controller
    exports: [UserService], // Export UserService to be used in other modules if needed
})
export class UserModule {}
