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
import { createUserObject } from './utils/user.functions';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll(@Res() res) {
    return this.usersService
      .getUsers()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || `Server error. Can't get users.`);
      });
  }

  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  get(@Param() params, @Res() res) {
    return this.usersService
      .getUserById(params.id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || `Server error. Can't get user.`);
      });
  }

  @Post()
  async create(@Req() req, @Res() res) {
    const user = new User();
    createUserObject(req.body, user);
    this.usersService
      .createUser(user)
      .then(() => {
        return res.status(200).json(user);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || `Server error. Can't create user.`);
      });
  }

  @Permissions('update-certain-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateCertainUser(@Param() params, @Req() req, @Res() res) {
    const user: User = await this.usersService.getUserById(params.id);
    createUserObject(req.body, user);
    this.usersService
      .updateUser(user)
      .then(() => {
        return res.status(200).json(user);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || `Server error. Can't update user.`);
      });
  }

  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param() params, @Res() res) {
    return this.usersService
      .deleteUser(params.id)
      .then((data) => {
        return res.status(200).json({ message: 'User successfully deleted' });
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || `Server error. Can't delete user.`);
      });
  }
}
