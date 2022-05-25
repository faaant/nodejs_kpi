import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@user/users.service';
import { UsersController } from '@user/users.controller';
import { User } from '@user/user.entity';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { SharedModule } from '@shared/shared.module';
import { PermissionModule } from '@permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserPermissionsModule,
    SharedModule,
    PermissionModule,
  ],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
