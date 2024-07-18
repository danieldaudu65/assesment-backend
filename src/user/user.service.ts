import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entites/user.entity'; // Ensure correct path to entity
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    // Fetch all users
    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    // Find a user by ID
    async findOne(id: number): Promise<User> {
        return this.userRepo.findOne({ where: { id } });
    }

    // Create a new user
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepo.create(createUserDto);
        return this.userRepo.save(user);
    }

    // Update an existing user by ID
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepo.update(id, updateUserDto);
        return this.userRepo.findOne({ where: { id } });
    }

    // Delete a user by ID
    async remove(id: number): Promise<void> {
        await this.userRepo.delete(id);
    }

    // Find a user by username
    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepo.findOne({ where: { username } });
    }
}
