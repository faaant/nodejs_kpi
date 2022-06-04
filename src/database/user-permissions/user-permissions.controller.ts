import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { UserPermissions } from './user-permissions.entity';
import { UserPermissionsService } from './user-permissions.service';
import { createUserPermissionObject } from './utils/user-permissions.functions';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private userPermissionsService: UserPermissionsService) {}

  @HttpCode(200)
  @Get()
  async getAll(): Promise<UserPermissions[]> {
    return await this.userPermissionsService.getAllPermissions();
  }

  @HttpCode(200)
  @Get(':id')
  async getUserPermissions(
    @Param() params: { id: string },
  ): Promise<UserPermissions[]> {
    return await this.userPermissionsService.getUserPermissions(params.id);
  }

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
