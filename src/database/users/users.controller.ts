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

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Req() req, @Res() res) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      const user: User = await this.usersService.getUser(jwtData.username);
      createUserObject(req.body, user);
      this.usersService
        .updateUser(user)
        .then(() => {
          return res.status(200).json({
            message: 'User updated',
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: error?.message ?? 'Fail to update user',
          });
        });
    }
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
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
