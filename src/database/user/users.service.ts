import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@user/user.entity';
import { validate } from 'class-validator';

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

  async updateUser(user: User) {
    const error = await validate(user);
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }
    await this.usersRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
  }

  async createUser(user: User) {
    const error = await validate(user, { skipMissingProperties: true });
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }
    await this.usersRepository.create(user);
    await this.usersRepository.save(user);
  }
}
