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

  async getUser(username: string): Promise<User> {
    return (
      await this.usersRepository.find({
        select: ['id', 'username', 'password'],
        where: [{ username }],
      })
    )[0];
  }

  async updateUser(user: User) {
    await this.usersRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
  }

  async createUser(user: User) {
    await this.usersRepository.create(user);
    await this.usersRepository.save(user);
  }
}
