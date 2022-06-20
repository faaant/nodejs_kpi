import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from '@users/users.service';
import { UsersController } from '@users/users.controller';
import { User } from '@database/entities/user.entity';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { SharedModule } from '@shared/shared.module';
import { PermissionModule } from '@permissions/permissions.module';
import { UserController } from '@users/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserPermissionsModule,
    SharedModule,
    PermissionModule,
  ],
  providers: [UsersService],
  controllers: [UsersController, UserController],
  exports: [UsersService],
})
export class UsersModule {}
