import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './users.service';
import { Request } from 'express';
import { User } from './user.entity';
import { UserPermissionsService } from '../user-permissions/user-permissions.service';
import { PermissionGuard } from '../../guards/permission.guard';
import { Permissions } from '../../shared/decorators/permissions.decorator';
import { JWTTokenService } from 'src/shared/jwt-key.service';

@Controller('users')
export class UsersController {
  constructor(
    private service: UserService,
    private userPermissionsService: UserPermissionsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll() {
    return this.service.getUsers();
  }

  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  async create(@Req() request: Request) {
    const user = new User();
    user.username = request.body.username;
    user.password = request.body.password;
    await this.service.createUser(user);
    this.userPermissionsService.addDefaultUserPermissions(user.id);
    return `This action create new user`;
  }

  @Permissions('update-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put()
  update(@Req() request: Request) {
    if (request?.body?.username && request?.body?.password) {
      const jwtData = this.jwtTokenService.decode(
        request.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        const user = new User();
        user.username = jwtData.username;
        user.id = jwtData.id;
        this.service.updateUser(user);
      }
    }
  }

  @Permissions('update-certain-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  updateCertainUser(@Param() params, @Req() request: Request) {
    request.body.id = params.id;
    this.service.updateUser(request.body);
    return `This action update user`;
  }

  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
