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

@Controller('users')
export class UsersController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard('jwt'))
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
  create(@Req() request: Request) {
    if (
      request?.body?.username &&
      request?.body?.password
    ) {
      this.service.createUser(request.body);
      return `This action create new user`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Param() params, @Req() request: Request) {
    if (
      request?.body?.username &&
      request?.body?.password &&
      request?.body?.roleId
    ) {
      const user = request.body;
      user.id = params.id;
      this.service.updateUser(user);
      return `This action update user`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
