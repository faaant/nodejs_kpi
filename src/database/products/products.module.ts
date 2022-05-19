import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { SharedModule } from 'src/shared/shared.module';
import { UserPermissionsModule } from '../user-permissions/user-permissions.module';
import { PermissionModule } from '../permissions/permissions.module';

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
