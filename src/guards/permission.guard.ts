import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { JWTTokenService } from '@shared/jwt-token.service';
import { UserPermissionsService } from '@user-permissions/user-permissions.service';
import { PermissionsService } from '@permissions/permissions.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtTokenService: JWTTokenService,
    private userPermissionService: UserPermissionsService,
    private permissionsService: PermissionsService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const neededPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const body = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof body === 'object') {
      const userPermissions =
        await this.userPermissionService.getUserPermissions(body?.id);
      const permisionsVocabulary =
        await this.permissionsService.getPermissions();
      for (const permission of neededPermissions) {
        if (
          !userPermissions.some((permissionId) => {
            const userPermission = permisionsVocabulary.find(
              (vocPermission) => vocPermission.id === permissionId.permissionId,
            ).permission;
            return userPermission === permission;
          })
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
