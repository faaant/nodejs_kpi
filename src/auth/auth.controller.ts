import { Controller, Post, Res, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    this.authService.login(body).then((jwtToken) => {
      res.cookie('jwt', jwtToken.access_token, {
        httpOnly: true,
        sameSite: true,
      });
      return res.json(jwtToken);
    });
  }
}
