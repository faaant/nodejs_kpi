import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTTokenService {
  constructor(private jwtService: JwtService) {}

  private JWTtoken: string;

  public setToken(token: string) {
    this.JWTtoken = token;
  }

  public getToken() {
    return this.JWTtoken;
  }

  public decode(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }
}
