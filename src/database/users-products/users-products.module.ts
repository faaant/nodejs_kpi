import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersProductsController } from '@users-products/users-products.controller';
import { UserProducts } from '@users-products/user-products.entity';
import { UsersProductsService } from '@users-products/users-products.service';
import { SharedModule } from '@shared/shared.module';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { PermissionModule } from '@permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProducts]),
    SharedModule,
    UserPermissionsModule,
    PermissionModule,
  ],
  controllers: [UsersProductsController],
  providers: [UsersProductsService],
})
export class UsersProductsModule {}
