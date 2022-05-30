import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '@permissions/permissions.module';
import { SharedModule } from '@shared/shared.module';
import { UserPermissionsController } from '@user-permissions/user-permissions.controller';
import { UserPermissions } from '@user-permissions/user-permissions.entity';
import { UserPermissionsService } from '@user-permissions/user-permissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPermissions]),
    PermissionModule,
    SharedModule,
  ],
  providers: [UserPermissionsService],
  controllers: [UserPermissionsController],
  exports: [UserPermissionsService],
})
export class UserPermissionsModule {}
