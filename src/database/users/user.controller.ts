import { PermissionGuard } from '@guards/permission.guard';
import { Body, Controller, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { User } from '@users/user.entity';
import { UsersService } from '@users/users.service';
import { createUserObject } from '@users/utils/user.functions';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JWTTokenService,
  ) {}
  @Permissions('update-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put('profile')
  async update(@Req() req: Request, @Body() body: User) {
    const jwtData = this.jwtTokenService.decode(req.cookies?.jwt);
    if (typeof jwtData === 'object') {
      const user: User = await this.usersService.getUser(jwtData?.username);
      createUserObject(req.body, user);
      return await this.usersService.updateUser(user);
    }
  }
}
