import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../../guards/permission.guard';
import { Permissions } from '../../shared/decorators/permissions.decorator';
import { UserPermissionsService } from './user-permissions.service';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private service: UserPermissionsService) {}

  @Permissions('get-permissions-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll() {
    return this.service.getAllPermissions();
  }

  @Permissions('get-user-permissions')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserPermissions(@Param() params) {
    this.service.getUserPermissions(params.id);
  }

  @Permissions('add-user-permission')
  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addUserPermission(@Param() params, @Request() request) {
    if (request?.body?.permissionId) {
      request.body.userId = params.id;
      this.service.addUserPermission(request.body);
    }
  }

  @Permissions('delete-user-permission')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteProduct(@Param() params, @Request() request) {
    if (request?.body?.permissionId) {
      request.body.userId = params.id;
      this.service.deleteUserPermission(request.body);
    }
  }
}
