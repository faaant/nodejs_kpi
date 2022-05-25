import { Controller, Req, Post, Response } from '@nestjs/common';
import { JWTTokenService } from '@shared/jwt-token.service';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Post('login')
  async login(@Req() req, @Response() res) {
    const jwtToken = await this.authService.login(req.body);
    this.jwtTokenService.setToken(jwtToken.access_token);
    return res.json(jwtToken);
  }
}
