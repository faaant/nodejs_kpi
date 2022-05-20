import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { PermissionModule } from '../permissions/permissions.module';
import { UserPermissionsController } from './user-permissions.controller';
import { UserPermissions } from './user-permissions.entity';
import { UserPermissionsService } from './user-permissions.service';

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
