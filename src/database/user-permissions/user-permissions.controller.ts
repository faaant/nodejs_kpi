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
import { UserPermissions } from '@user-permissions/user-permissions.entity';
import { UserPermissionsService } from '@user-permissions/user-permissions.service';
import { createUserPermissionObject } from '@user-permissions/utils/user-permissions.functions';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private userPermissionsService: UserPermissionsService) {}

  @HttpCode(200)
  @Permissions('get-permissions-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getAll(): Promise<UserPermissions[]> {
    return this.userPermissionsService.getAllPermissions();
  }

  @HttpCode(200)
  @Permissions('get-user-permissions')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  async getUserPermissions(
    @Param() params: { id: string },
  ): Promise<UserPermissions[]> {
    return this.userPermissionsService.getUserPermissions(params.id);
  }

  @HttpCode(200)
  @Permissions('add-user-permission')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  async addUserPermission(
    @Param() params: { id: string },
    @Body() body: UserPermissions,
  ): Promise<UserPermissions> {
    body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(body, userPermission);
    return this.userPermissionsService.addUserPermission(userPermission);
  }

  @HttpCode(200)
  @Permissions('delete-user-permission')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUserPermission(
    @Param() params: { id: string },
    @Body() body: UserPermissions,
  ): Promise<UserPermissions> {
    body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(body, userPermission);
    return this.userPermissionsService.deleteUserPermission(userPermission);
  }
}
