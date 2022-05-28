import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from '@permissions/permissions.entity';
import { PermissionsService } from '@permissions/permissions.service';
import {
  adminPermissions,
  defaultPermissions,
} from '@user-permissions/user-permissions-constants';
import { UserPermissions } from '@user-permissions/user-permissions.entity';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermissions)
    private userPermissionsRepository: Repository<UserPermissions>,
    private permissionsService: PermissionsService,
  ) {}

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

  async getAllPermissions(): Promise<UserPermissions[]> {
    return await this.userPermissionsRepository.find();
  }

  async getUserPermissions(userId: string): Promise<UserPermissions[]> {
    return await this.userPermissionsRepository.find({
      select: ['permissionId'],
      where: [{ userId }],
    });
  }

  async deleteUserPermission(body) {
    if (!this.validatePermission(body)) {
      throw 'Not all fields are filled';
    }
    const userPermission = {
      userId: body.userId,
      permissionId: body.permissionId,
    };
    await this.userPermissionsRepository.delete(userPermission);
  }

  async deleteAllPermissions(userId: string) {
    await this.userPermissionsRepository.delete({ userId });
  }

  async addUserPermission(body) {
    if (!this.validatePermission(body)) {
      throw 'Not all fields are filled';
    }
    const userPermission = {
      userId: body.userId,
      permissionId: body.permissionId,
    };
    await this.userPermissionsRepository.create(userPermission);
    await this.userPermissionsRepository.save(userPermission);
  }

  validatePermission(body) {
    return body?.permissionId && body?.userId;
  }
}
