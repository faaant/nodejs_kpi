import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionDto } from '@permissions/dto';
import { PermissionsService } from '@permissions/permissions.service';
import {
  UserPermissionsDto,
  UserPermissionsDbDto,
} from '@user-permissions/dto';

import {
  adminPermissions,
  defaultPermissions,
} from '@user-permissions/user-permissions-constants';
import { validate } from 'class-validator';
import { UserPermissions } from '@database/entities/user-permissions.entity';

@Injectable()
export class UserPermissionsService {
  constructor(
    private permissionsService: PermissionsService,
    @InjectRepository(UserPermissions)
    private userPermissionsRepository: Repository<UserPermissionsDbDto>,
  ) {}

  async getAllPermissions(): Promise<UserPermissionsDbDto[]> {
    return this.userPermissionsRepository.find();
  }

  async getUserPermissions(userId: string): Promise<UserPermissionsDto[]> {
    return this.userPermissionsRepository.find({
      select: ['permissionId'],
      where: [{ userId }],
    });
  }

  async deleteUserPermission(
    userPermission: UserPermissionsDto,
  ): Promise<UserPermissionsDto> {
    await this.userPermissionsRepository.delete(userPermission);
    return userPermission;
  }

  async deleteAllPermissions(userId: string): Promise<UserPermissionsDto[]> {
    const userPermissions: UserPermissionsDto[] = await this.getUserPermissions(
      userId,
    );
    await this.userPermissionsRepository.delete({ userId });
    return userPermissions;
  }

  async addUserPermission(
    userPermission: UserPermissionsDto,
  ): Promise<UserPermissionsDto> {
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

  async addPermissions(userId: string, role = 'user'): Promise<void> {
    const permissions: PermissionDto[] =
      await this.permissionsService.getPermissions();
    const addedPermissions: string[] =
      role === 'user' ? defaultPermissions : adminPermissions;
    const newUserPermissions: (UserPermissionsDto | undefined)[] =
      permissions.map((permission) => {
        if (!permission?.permission) {
          throw new BadRequestException();
        }
        if (addedPermissions.indexOf(permission.permission) != -1) {
          const newUserPermission = new UserPermissionsDto();
          newUserPermission.permissionId = permission.id;
          newUserPermission.userId = userId;
          return newUserPermission;
        }
      });
    newUserPermissions.forEach((newUserPermission) => {
      if (newUserPermission) {
        this.userPermissionsRepository.create(newUserPermission);
        this.userPermissionsRepository.save(newUserPermission);
      }
    });
  }
}
