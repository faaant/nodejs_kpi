import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtinsertionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const cookies = Object.fromEntries(
      req.headers.cookie.split(';').map((el: any) => el.split('=')),
    );
    req.headers['authorization'] = `Bearer ${cookies['jwt']}`;
    next();
  }
}
