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
import { UserPermissionsService } from './user-permissions.service';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private service: UserPermissionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.service.getAllPermissions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserPermissions(@Param() params) {
    this.service.getUserPermissions(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addUserPermission(@Param() params, @Request() request) {
    if (request?.body?.permissionId) {
      request.body.userId = params.id;
      this.service.addUserPermission(request.body);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteProduct(@Param() params, @Request() request) {
    if (request?.body?.permissionId) {
      request.body.userId = params.id;
      this.service.deleteUserPermission(request.body);
    }
  }
}
