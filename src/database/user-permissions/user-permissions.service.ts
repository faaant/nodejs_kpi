import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPermissions } from './user-permissions.entity';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermissions)
    private userPermissionsRepository: Repository<UserPermissions>,
  ) {}

  async getAllPermissions(): Promise<UserPermissions[]> {
    return await this.userPermissionsRepository.find();
  }

  async getUserPermissions(userId: string): Promise<UserPermissions[]> {
    return await this.userPermissionsRepository.find({
      select: ['permissionId'],
      where: [{ userId }],
    });
  }

  async deleteUserPermission(userPermission: UserPermissions) {
    this.userPermissionsRepository.delete(userPermission);
  }

  async addUserPermission(newUserPermission: UserPermissions) {
    this.userPermissionsRepository.create(newUserPermission);
    this.userPermissionsRepository.save(newUserPermission);
  }
}
