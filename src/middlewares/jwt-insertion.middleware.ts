import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWTTokenService } from '@shared/services/jwt-token.service';

@Injectable()
export class JwtinsertionMiddleware implements NestMiddleware {
  constructor(private jwtTokenSerice: JWTTokenService) {}
  use(req: any, res: any, next: () => void) {
    const idToken = this.jwtTokenSerice.getToken();
    if (idToken) {
      req.headers['authorization'] = `Bearer ${idToken}`;
    }
    next();
  }
}
