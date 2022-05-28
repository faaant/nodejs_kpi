import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  Res,
} from '@nestjs/common';

import { UsersService } from '@users/users.service';
import { User } from '@users/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(@Res() res) {
    return this.usersService.getUsers();
  }

  @Get(':id')
  get(@Param() params, @Res() res) {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  async create(@Req() req, @Res() res) {
    const user = new User();
    user.username = req.body?.username;
    user.password = req.body?.password;
    user.phone = req.body?.phone;
    user.email = req.body?.email;
    console.log(req.body);
    await this.usersService.createUser(user);
  }

  @Put(':id')
  updateCertainUser(@Param() params, @Req() request, @Res() res) {
    request.body.id = params.id;
    this.usersService.updateUser(request.body);
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res) {
    return this.usersService.deleteUser(params.id);
  }
}
