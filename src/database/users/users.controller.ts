import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '@users/users.service';
import { User } from '@users/user.entity';
import { createUserObject } from '@users/utils/user.functions';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-users')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Get()
  async getAll() {
    return await this.usersService.getUsers();
  }

  @Permissions('get-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Get(':id')
  async get(@Param() params: { id: string }) {
    return await this.usersService.getUserById(params.id);
  }

  @HttpCode(200)
  @Post()
  async create(@Body() user: User): Promise<User> {
    const newUser = new User();
    createUserObject(user, newUser);
    return await this.usersService.createUser(newUser);
  }

  // @Permissions('update-user')
  // @UseGuards(AuthGuard('jwt'), PermissionGuard)
  // @HttpCode(200)
  // @Put()
  // async update(@Req() req: Request, @Body() body : User) {
  //   const jwtData = this.jwtTokenService.decode(
  //     req.headers.get('authorization')
  //   );
  //   if (typeof jwtData === 'object') {
  //     const user: User = await this.usersService.getUser(jwtData.username);
  //     createUserObject(body, user);
  //     return await this.usersService.updateUser(user)
  //   }
  // }

  @HttpCode(200)
  @Put(':id')
  async updateCertainUser(
    @Param() params: { id: string },
    @Body() user: User,
  ): Promise<User> {
    const updatedUser: User = await this.usersService.getUserById(params.id);
    createUserObject(user, updatedUser);
    return await this.usersService.updateUser(updatedUser);
  }

  @Permissions('delete-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteUser(@Param() params: { id: string }): Promise<User> {
    return await this.usersService.deleteUser(params.id);
  }
}
