import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
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

  @Permissions('get-permissions-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll(@Res() res) {
    console.log('here');
    return this.userPermissionsService
      .getAllPermissions()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch(() => {
        return res.status(500).json({
          message: 'Fail to get users and their permissions',
        });
      });
  }

  @Permissions('get-user-permissions')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  getUserPermissions(@Param() params, @Res() res) {
    this.userPermissionsService.getUserPermissions(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user permissions',
      });
    });
  }

  @Permissions('add-user-permission')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  addUserPermission(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(req.body, userPermission);
    return this.userPermissionsService
      .addUserPermission(userPermission)
      .then(() => {
        return res.status(200).json({
          message: 'User permission added',
        });
      });
  }

  @Permissions('delete-user-permission')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteUserPermission(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(req.body, userPermission);
    return this.userPermissionsService
      .deleteUserPermission(userPermission)
      .then(() => {
        return res.status(200).json({
          message: 'User permission deleted',
        });
      });
  }
}
