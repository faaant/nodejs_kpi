import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  Res,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from '@users/users.service';
import { User } from '@users/user.entity';
import { createUserObject } from './utils/user.functions';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @HttpCode(200)
  @Get(':id')
  get(@Param() params: { id: string }) {
    return this.usersService.getUserById(params.id);
  }

  @HttpCode(200)
  @Post()
  async create(@Body() user: User) {
    const newUser = new User();
    createUserObject(user, newUser);
    return await this.usersService.createUser(newUser);
  }

  @HttpCode(200)
  @Put(':id')
  async updateCertainUser(@Param() params: { id: string }, @Body() user: User) {
    const updatedUser: User = await this.usersService.getUserById(params.id);
    createUserObject(user, updatedUser);
    return await this.usersService.updateUser(updatedUser);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteUser(@Param() params: { id: string }) {
    return this.usersService.deleteUser(params.id);
  }
}
