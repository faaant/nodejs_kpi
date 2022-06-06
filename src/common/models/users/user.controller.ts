import { PermissionGuard } from '@guards/permission.guard';
import { Controller, Put, Req, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { UserDto } from '@users/dto';
import { UsersService } from '@users/users.service';
import { createUserObject } from '@users/utils/user.functions';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @HttpCode(200)
  @Permissions('update-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put('profile')
  async update(@Req() req: Request): Promise<UserDto | undefined> {
    const jwtData = this.jwtTokenService.decode(req.cookies?.jwt);
    if (typeof jwtData === 'object') {
      const user: UserDto = await this.usersService.getUser(jwtData?.username);
      createUserObject(req.body, user);
      return this.usersService.updateUser(user);
    }
  }
}
