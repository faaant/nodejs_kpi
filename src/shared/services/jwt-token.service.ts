import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTTokenService {
  constructor(private jwtService: JwtService) {}

  public decode(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }
}
