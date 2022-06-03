import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/user.entity';
import { UserPermissionsService } from '@user-permissions/user-permissions.service';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private userPermissionsService: UserPermissionsService,
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
    const error = await validate(user, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    await this.usersRepository.update(user.id, user);
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
  }

  async createUser(user: User) {
    const error = await validate(user, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    await this.usersRepository.create(user);
    await this.usersRepository.save(user);
    await this.userPermissionsService.addDefaultUserPermissions(user.id);
  }
}
