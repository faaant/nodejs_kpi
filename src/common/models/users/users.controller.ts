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
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '@users/users.service';
import { UserDto } from '@users/dto';
import { createUserObject } from '@users/utils/user.functions';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(200)
  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getAll(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }

  @HttpCode(200)
  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  async get(@Param() params: { id: string }): Promise<UserDto> {
    return this.usersService.getUserById(params.id);
  }

  @HttpCode(200)
  @Post()
  async create(@Body() body: UserDto): Promise<UserDto> {
    const user = new UserDto();
    createUserObject(body, user);
    return this.usersService.createUser(user);
  }

  @HttpCode(200)
  @Permissions('update-certain-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateCertainUser(
    @Param() params: { id: string },
    @Req() req: Request,
  ): Promise<UserDto> {
    const user: UserDto = await this.usersService.getUserById(params.id);
    createUserObject(req.body, user);
    return this.usersService.updateUser(user);
  }

  @HttpCode(200)
  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param() params: { id: string }): Promise<UserDto> {
    return this.usersService.deleteUser(params.id);
  }
}
