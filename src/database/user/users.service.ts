import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@user/user.entity';

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

  async updateUser(body) {
    const user = {
      id: body?.id,
      username: body?.username,
      password: body?.password,
      email: body?.email ?? null,
      phone: body?.phone ?? null,
    };
    await this.usersRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
  }

  async createUser(body) {
    if (!this.validateUser(body)) {
      throw 'Not all fields are filled';
    }
    const user = {
      username: body?.username,
      password: body?.password,
      email: body?.email ?? null,
      phone: body?.phone ?? null,
    };
    await this.usersRepository.create(user);
    await this.usersRepository.save(user);
  }

  validateUser(body) {
    return body?.username && body?.password;
  }
}
