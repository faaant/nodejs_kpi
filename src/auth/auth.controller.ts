import { Controller, Req, Post, Res } from '@nestjs/common';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Post('login')
  login(@Req() req, @Res() res) {
    this.authService
      .login(req.body)
      .then((jwtToken) => {
        this.jwtTokenService.setToken(jwtToken.access_token);
        return res.status(200).json(jwtToken);
      })
      .catch(() => {
        return res.status(400).json({
          message: 'Not valid user',
        });
      });
  }
}
