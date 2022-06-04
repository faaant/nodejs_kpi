import { Controller, Post, Res, Req, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    return this.authService.login(req.body).then((jwtToken) => {
      res.cookie('jwt', jwtToken.access_token, {
        httpOnly: true,
        sameSite: 'strict',
      });
      return res.json(jwtToken);
    });
  }
}
