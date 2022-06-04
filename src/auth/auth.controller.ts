import { Controller, Post, Res, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';

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
      res.headers.append('Cookie', `jwt=${jwtToken?.access_token}`);
      return res.json();
    });
  }
}
