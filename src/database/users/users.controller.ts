import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '@users/users.service';
import { User } from '@users/user.entity';
import { createUserObject } from '@users/utils/user.functions';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll(@Res() res) {
    return this.usersService.getUsers().then((data) => {
      return res.status(200).json(data);
    });
  }

  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  get(@Param() params, @Res() res) {
    return this.usersService.getUserById(params.id).then((data) => {
      return res.status(200).json(data);
    });
  }

  @Post()
  async create(@Req() req, @Res() res) {
    const user = new User();
    createUserObject(req.body, user);
    return this.usersService.createUser(user).then(() => {
      return res.status(200).json(user);
    });
  }

  @Permissions('update-certain-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateCertainUser(@Param() params, @Req() req, @Res() res) {
    const user: User = await this.usersService.getUserById(params.id);
    createUserObject(req.body, user);
    return this.usersService.updateUser(user).then(() => {
      return res.status(200).json(user);
    });
  }

  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param() params, @Res() res) {
    return this.usersService.deleteUser(params.id).then((data) => {
      return res.status(200).json({ message: 'User successfully deleted' });
    });
  }
}
