import { Controller, Req, Post, Res, HttpCode } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    return this.authService.login(req.body).then((jwtToken) => {
      console.log(jwtToken);
      res.cookie('jwt', jwtToken?.access_token, {
        httpOnly: true,
        sameSite: true,
      });
      return res.json(jwtToken);
    });
  }
}
