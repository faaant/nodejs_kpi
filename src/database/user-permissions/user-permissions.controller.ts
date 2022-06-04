import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserPermissions } from './user-permissions.entity';
import { UserPermissionsService } from './user-permissions.service';
import { createUserPermissionObject } from './utils/user-permissions.functions';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private userPermissionsService: UserPermissionsService) {}

  @Permissions('get-permissions-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Get()
  async getAll(): Promise<UserPermissions[]> {
    return await this.userPermissionsService.getAllPermissions();
  }

  @Permissions('get-user-permissions')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Get(':id')
  async getUserPermissions(
    @Param() params: { id: string },
  ): Promise<UserPermissions[]> {
    return await this.userPermissionsService.getUserPermissions(params.id);
  }

  @Permissions('add-user-permission')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Post(':id')
  async addUserPermission(
    @Param() params: { id: string },
    @Body() body: UserPermissions,
  ): Promise<UserPermissions> {
    body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(body, userPermission);
    return await this.userPermissionsService.addUserPermission(userPermission);
  }

  @Permissions('delete-user-permission')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Delete(':id')
  async deleteUserPermission(
    @Param() params: { id: string },
    @Body() body: UserPermissions,
  ): Promise<UserPermissions> {
    body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(body, userPermission);
    return await this.userPermissionsService.deleteUserPermission(
      userPermission,
    );
  }
}
