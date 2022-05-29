import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersProductsController } from '@users-products/users-products.controller';
import { UserProducts } from '@users-products/user-products.entity';
import { UsersProductsService } from '@users-products/users-products.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProducts]), SharedModule],
  controllers: [UsersProductsController],
  providers: [UsersProductsService],
})
export class UsersProductsModule {}
