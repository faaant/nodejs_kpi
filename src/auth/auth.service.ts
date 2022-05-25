import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = await this.userService.getUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return true;
    }
    return false;
  }

  async login(user: { username: string; password: string }) {
    if (await this.validateUser(user.username, user.password)) {
      const userInfo = await this.userService.getUser(user.username);
      const payload = {
        id: userInfo.id,
        username: userInfo.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
