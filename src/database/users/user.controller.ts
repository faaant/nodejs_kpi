import { PermissionGuard } from '@guards/permission.guard';
import { Controller, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { createUserObject } from './utils/user.functions';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JWTTokenService,
  ) {}
  @Permissions('update-user')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put('profile')
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
}
