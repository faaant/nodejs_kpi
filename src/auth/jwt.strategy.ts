import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@users/users.service';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: JwtStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  private static extractJWT(req: Request): string | null {
    const cookies = req.headers?.cookie;
    if (cookies) {
      const cookiesObj = cookies.split(';').map((el: string) => el.split('='))
        ? Object.fromEntries(cookies.split(';').map((el: any) => el.split('=')))
        : null;
      return cookiesObj?.jwt ? cookiesObj.jwt : null;
    }
    return null;
  }

  async validate(payload: any) {
    if (!(await this.usersService.getUser(payload.username))) {
      throw UnauthorizedException;
    }
    return { userId: payload.sub, username: payload.username };
  }
}
