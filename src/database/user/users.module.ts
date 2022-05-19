import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserPermissionsModule } from '../user-permissions/user-permissions.module';
import { SharedModule } from 'src/shared/shared.module';
import { PermissionModule } from '../permissions/permissions.module';

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
