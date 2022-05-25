import {
  Controller,
  Post,
  Body,
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

@Controller('users')
export class UsersController {
  constructor(
    private service: UserService,
    private userPermissionsService: UserPermissionsService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.service.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  async create(@Req() request: Request) {
    if (request?.body?.username && request?.body?.password) {
      const user = new User();
      user.username = request.body.username;
      user.password = request.body.password;
      await this.service.createUser(user);
      this.userPermissionsService.addDefaultUserPermissions(user.id);
      return `This action create new user`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Param() params, @Req() request: Request) {
    if (request?.body?.username && request?.body?.password) {
      const user = {
        username: request.body.username,
        password: request.body.password,
        id: params.id,
      };
      // this.service.updateUser(user);
      return `This action update user`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
