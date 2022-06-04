import { BadRequestException, Injectable } from '@nestjs/common';
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
    return user && user.password === pass;
  }

  async login(user: {
    username: string;
    password: string;
  }): Promise<{ access_token: string }> {
    if (await this.validateUser(user.username, user.password)) {
      const userInfo = await this.usersService.getUser(user.username);
      const payload = {
        id: userInfo?.id,
        username: userInfo?.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException();
  }
}
