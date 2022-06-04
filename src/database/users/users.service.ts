import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(username: string): Promise<User> {
    return (
      await this.usersRepository.find({
        select: ['id', 'username', 'password', 'phone', 'email'],
        where: [{ username }],
      })
    )[0];
  }

  async getUserById(id: string): Promise<User> {
    return (
      await this.usersRepository.find({
        select: ['id', 'username', 'password', 'phone', 'email'],
        where: [{ id }],
      })
    )[0];
  }

  async updateUser(user: User): Promise<User> {
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user: User = await this.getUserById(id);
    await this.usersRepository.delete(id);
    return user;
  }

  async createUser(user: User): Promise<User> {
    await this.usersRepository.create(user);
    await this.usersRepository.save(user);
    return user;
  }
}
