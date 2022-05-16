import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'username', 'password', 'role'],
      where: [{ id: _id }],
    });
  }

  async updateUser(user: User) {
    this.usersRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    this.usersRepository.delete(id);
  }

  async createUser(user: User) {
    this.usersRepository.create(user);
    this.usersRepository.save(user);
  }
}
