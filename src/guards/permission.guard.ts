import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JWTTokenService } from 'src/shared/jwt-key.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtTokenService: JWTTokenService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const neededPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const body = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    //get user permissions by id
    const userPermissions = ['read', 'create'];

    for (const permission of neededPermissions) {
      if (!userPermissions.some((el) => el === permission)) {
        return false;
      }
    }
    return true;
  }
}
