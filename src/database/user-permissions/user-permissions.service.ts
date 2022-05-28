import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@permissions/permissions.entity';
import { PermissionsService } from '@permissions/permissions.service';
import { UserPermissions } from './user-permissions.entity';
import {
  adminPermissions,
  defaultPermissions,
} from './user-permissions-constants';

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

  async deleteUserPermission(userPermission: UserPermissions) {
    await this.userPermissionsRepository.delete(userPermission);
  }

  async deleteAllPermissions(userId: string) {
    await this.userPermissionsRepository.delete({ userId });
  }

  async addUserPermission(userPermission: UserPermissions) {
    await this.userPermissionsRepository.create(userPermission);
    await this.userPermissionsRepository.save(userPermission);
  }

  async addDefaultUserPermissions(userId: string) {
    const permissions: Permission[] =
      await this.permissionsService.getPermissions();
    const newUserPermissions: UserPermissions[] = permissions.map(
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

  async addAdminPermissions(userId: string) {
    const permissions: Permission[] =
      await this.permissionsService.getPermissions();
    const adminUserPermissions: UserPermissions[] = permissions.map(
      (permission) => {
        if (adminPermissions.indexOf(permission.permission) != -1) {
          const newUserPermission = new UserPermissions();
          newUserPermission.permissionId = permission.id;
          newUserPermission.userId = userId;
          return newUserPermission;
        }
      },
    );
    adminUserPermissions.forEach((newUserPermission) => {
      if (newUserPermission) {
        this.userPermissionsRepository.create(newUserPermission);
        this.userPermissionsRepository.save(newUserPermission);
      }
    });
  }
}
