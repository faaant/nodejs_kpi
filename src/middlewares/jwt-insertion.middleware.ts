import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtinsertionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const cookies = req.headers?.cookie
      ? Object.fromEntries(
          req.headers.cookie.split(';').map((el) => el.split('=')),
        )
      : null;
    req.headers['authorization'] = `Bearer ${cookies?.jwt}`;
    next();
  }
}
