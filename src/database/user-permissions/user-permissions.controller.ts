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
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@guards/permission.guard';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { UserPermissionsService } from '@user-permissions/user-permissions.service';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private userPermissionsService: UserPermissionsService) {}

  @Permissions('get-permissions-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll(@Res() res) {
    return this.userPermissionsService.getAllPermissions().catch(() => {
      return res.status(500).json({
        message: 'Fail to get users and their permissions',
      });
    });
  }

  @Permissions('get-user-permissions')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserPermissions(@Param() params, @Res() res) {
    this.userPermissionsService.getUserPermissions(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user permissions',
      });
    });
  }

  @Permissions('add-user-permission')
  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addUserPermission(@Param() params, @Req() request, @Res() res) {
    request.body.userId = params.id;
    this.userPermissionsService
      .addUserPermission(request.body)
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

  @Permissions('delete-user-permission')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUserPermission(@Param() params, @Req() request, @Res() res) {
    request.body.userId = params.id;
    this.userPermissionsService
      .deleteUserPermission(request.body)
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
