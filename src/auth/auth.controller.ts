import { Controller, Req, Post, Res } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    return this.authService.login(req.body).then((jwtToken) => {
      res.cookie('jwt', jwtToken.access_token, {
        httpOnly: true,
        sameSite: true,
      });
      return res.status(200).json(jwtToken);
    });
  }
}
