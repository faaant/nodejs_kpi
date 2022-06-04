import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = await this.usersService.getUser(username);
    if (user && user.password === pass) {
      return true;
    }
    return false;
  }

  async login(user: { username: string; password: string }) {
    if (await this.validateUser(user.username, user.password)) {
      const userInfo = await this.usersService.getUser(user.username);
      const payload = {
        id: userInfo.id,
        username: userInfo.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
