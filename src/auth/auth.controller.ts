import { Controller, Request, Post, UseGuards, Response } from '@nestjs/common';
import { JWTTokenService } from 'src/shared/jwt-key.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Post('login')
  async login(@Request() req, @Response() res) {
    const jwtToken = await this.authService.login(req.body);
    this.jwtTokenService.setToken(jwtToken.access_token);
    return res.json(jwtToken);
  }
}
