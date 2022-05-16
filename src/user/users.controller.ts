import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private service: UserService) {}

  @Get()
  getAll() {
    return this.service.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Req() request: Request) {
    console.log(request.body);
    if (
      request?.body?.username &&
      request?.body?.password &&
      request?.body?.roleId
    ) {
      this.service.createUser(request.body);
      return `This action create new user`;
    }
  }

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

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
