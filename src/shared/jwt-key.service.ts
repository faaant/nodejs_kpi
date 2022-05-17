import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTTokenService {
  private JWTtoken: string;

  public setToken(token: string) {
    this.JWTtoken = token;
  }

  public getToken() {
    return this.JWTtoken;
  }
}
