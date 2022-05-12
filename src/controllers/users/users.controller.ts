import { Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Req() request: Request) {
    return `This action create a user`;
  }

  @Put(':id')
  updateUser(@Param() params, @Req() request: Request): string {
    console.log(params.id);
    return `This action update a #${params.id} user`;
  }

  @Delete(':id')
  deleteUser(@Param() params): string {
    console.log(params.id);
    return `This action delete a #${params.id} user`;
  }
}
