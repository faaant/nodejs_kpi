import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '@user/users.service';
import { User } from '@user/user.entity';
import { UserPermissionsService } from '@user-permissions/user-permissions.service';
import { PermissionGuard } from '@guards/permission.guard';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { JWTTokenService } from '@shared/jwt-token.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private userPermissionsService: UserPermissionsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getAll(@Res() res) {
    return this.userService
      .getUsers()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err?.message ?? 'Fail to get all users',
        });
      });
  }

  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  get(@Param() params, @Res() res) {
    return this.userService
      .getUserById(params.id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err?.message ?? 'Fail to get user',
        });
      });
  }

  @Post()
  async create(@Req() req, @Res() res) {
    try {
      const user = new User();
      user.username = req.body?.username;
      user.password = req.body?.password;
      user.phone = req.body?.phone;
      user.email = req.body?.email;
      console.log(req.body);
      await this.userService.createUser(user);
      // const newUser = await this.userService.getUser(req.body?.username);
      await this.userPermissionsService.addDefaultUserPermissions(user.id);
      return res.status(200).json({
        message: 'User created succesfuly',
      });
    } catch (error) {
      const statusCode = error?.message ? 400 : 500;
      return res.status(statusCode).json({
        message: error?.message ?? 'Fail to create user',
      });
    }
  }

  @Permissions('update-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put()
  async update(@Req() request, @Res() res) {
    const jwtData = this.jwtTokenService.decode(
      request.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      const user: User = await this.userService.getUser(jwtData.username);
      user.username = request?.body?.username ?? jwtData.username;
      user.password = request?.body?.password ?? user.password;
      user.phone = request?.body?.phone ?? user.phone;
      user.username = request?.body?.email ?? user.email;
      this.userService
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

  @Permissions('update-certain-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  updateCertainUser(@Param() params, @Req() request, @Res() res) {
    request.body.id = params.id;
    this.userService
      .updateUser(request.body)
      .then(() => {
        return res.status(200).json({
          message: 'User updated',
        });
      })
      .catch(() => {
        return res.status(500).json({
          message: 'Fail to update user',
        });
      });
  }

  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param() params, @Res() res) {
    await this.userPermissionsService.deleteAllPermissions(params.id);
    return this.userService
      .deleteUser(params.id)
      .then(() => {
        return res.status(200).json({
          message: 'User deleted',
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: 'Fail to delete user',
        });
      });
  }
}
