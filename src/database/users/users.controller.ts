import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '@users/users.service';
import { User } from '@users/user.entity';
import { createUserObject } from '@users/utils/user.functions';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getAll() {
    return this.usersService.getUsers();
  }

  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  async get(@Param() params: { id: string }) {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  async create(@Body() body: User) {
    const user = new User();
    createUserObject(body, user);
    return this.usersService.createUser(user);
  }

  @Permissions('update-certain-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateCertainUser(
    @Param() params: { id: string },
    @Req() req: Request,
  ) {
    const user: User = await this.usersService.getUserById(params.id);
    createUserObject(req.body, user);
    return this.usersService.updateUser(user);
  }

  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param() params: { id: string }) {
    return this.usersService.deleteUser(params.id);
  }
}
