import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@permissions/permissions.entity';
import { PermissionsService } from '@permissions/permissions.service';
import { UserPermissions } from './user-permissions.entity';
import {
  adminPermissions,
  defaultPermissions,
} from './user-permissions-constants';
import { validate } from 'class-validator';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermissions)
    private userPermissionsRepository: Repository<UserPermissions>,
    private permissionsService: PermissionsService,
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

  async deleteUserPermission(
    userPermission: UserPermissions,
  ): Promise<UserPermissions> {
    await this.userPermissionsRepository.delete(userPermission);
    return userPermission;
  }

  async deleteAllPermissions(userId: string): Promise<UserPermissions[]> {
    const userPermissions: UserPermissions[] = await this.getUserPermissions(
      userId,
    );
    await this.userPermissionsRepository.delete({ userId });
    return userPermissions;
  }

  async addUserPermission(
    userPermission: UserPermissions,
  ): Promise<UserPermissions> {
    const error = await validate(userPermission, {
      skipMissingProperties: true,
    });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.userPermissionsRepository.create(userPermission);
    await this.userPermissionsRepository.save(userPermission);
    return userPermission;
  }

  async addDefaultUserPermissions(userId: string): Promise<void> {
    const permissions: Permission[] =
      await this.permissionsService.getPermissions();
    const newUserPermissions: (UserPermissions | undefined)[] = permissions.map(
      (permission) => {
        if (defaultPermissions.indexOf(permission.permission) != -1) {
          const newUserPermission = new UserPermissions();
          newUserPermission.permissionId = permission.id;
          newUserPermission.userId = userId;
          return newUserPermission;
        }
      },
    );
    newUserPermissions.forEach((newUserPermission) => {
      if (newUserPermission) {
        this.userPermissionsRepository.create(newUserPermission);
        this.userPermissionsRepository.save(newUserPermission);
      }
    });
  }

  async addAdminPermissions(userId: string): Promise<void> {
    const permissions: Permission[] =
      await this.permissionsService.getPermissions();
    const adminUserPermissions: (UserPermissions | undefined)[] =
      permissions.map((permission) => {
        if (adminPermissions.indexOf(permission.permission) != -1) {
          const newUserPermission = new UserPermissions();
          newUserPermission.permissionId = permission.id;
          newUserPermission.userId = userId;
          return newUserPermission;
        }
      });
    adminUserPermissions.forEach((newUserPermission) => {
      if (newUserPermission) {
        this.userPermissionsRepository.create(newUserPermission);
        this.userPermissionsRepository.save(newUserPermission);
      }
    });
  }
}
