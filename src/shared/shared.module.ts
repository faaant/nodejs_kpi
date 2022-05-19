import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from 'src/database/permissions/permissions.module';
import { UserPermissionsModule } from 'src/database/user-permissions/user-permissions.module';

import { JWTTokenService } from './jwt-key.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    UserPermissionsModule,
    PermissionModule,
  ],
  providers: [JWTTokenService],
  exports: [JWTTokenService, UserPermissionsModule, PermissionModule],
})
export class SharedModule {}
