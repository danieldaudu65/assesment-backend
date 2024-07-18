import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entites/user.entity'; // Adjust the path accordingly
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Fetch all users from the database
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Find a user by their ID
    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    // Find a user by their email address
    async findByEmail(email: string): Promise<User> {
        // @ts-ignore
        return this.userRepository.findOne({ where: { email } });
    }

    // Create a new user
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    // Update an existing user
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOne({ where: { id } });
    }

    // Delete a user by their ID
    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
