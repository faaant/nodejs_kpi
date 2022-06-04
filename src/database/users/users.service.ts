import { BadRequestException, Injectable } from '@nestjs/common';
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
    return this.usersRepository.find();
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
    const error = await validate(user, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    if (!user?.id) {
      throw new BadRequestException();
    }
    await this.usersRepository.update(user.id, user);
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user: User = await this.getUserById(id);
    this.userPermissionsService.deleteAllPermissions(id);
    await this.usersRepository.delete(id);
    return user;
  }

  async createUser(user: User): Promise<User> {
    const error = await validate(user, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.usersRepository.create(user);
    await this.usersRepository.save(user);
    if (!user?.id) {
      throw new BadRequestException();
    }
    await this.userPermissionsService.addPermissions(user?.id);
    return user;
  }
}
