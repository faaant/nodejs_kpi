import { Module } from '@nestjs/common';

import { ProductsService } from '@products/products.service';
import { ProductsController } from '@products/products.controller';
import { SharedModule } from '@shared/shared.module';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { PermissionModule } from '@permissions/permissions.module';
import { Product } from '@database/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    SharedModule,
    UserPermissionsModule,
    PermissionModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
