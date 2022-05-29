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
import { UserPermissions } from './user-permissions.entity';
import { UserPermissionsService } from './user-permissions.service';
import { createUserPermissionObject } from './utils/user-permissions.functions';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private userPermissionsService: UserPermissionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Res() res) {
    return this.userPermissionsService.getAllPermissions().catch(() => {
      return res.status(500).json({
        message: 'Fail to get users and their permissions',
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserPermissions(@Param() params, @Res() res) {
    this.userPermissionsService.getUserPermissions(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user permissions',
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addUserPermission(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(req.body, userPermission);
    this.userPermissionsService
      .addUserPermission(userPermission)
      .then(() => {
        return res.status(200).json({
          message: 'User permission added',
        });
      })
      .catch((error) => {
        const statusCode = error?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: error?.message ?? 'Fail to add user permission',
        });
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUserPermission(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const userPermission = new UserPermissions();
    createUserPermissionObject(req.body, userPermission);
    this.userPermissionsService
      .deleteUserPermission(userPermission)
      .then(() => {
        return res.status(200).json({
          message: 'User permission deleted',
        });
      })
      .catch((error) => {
        const statusCode = error?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: error?.message ?? 'Fail to delete user permission',
        });
      });
  }
}
