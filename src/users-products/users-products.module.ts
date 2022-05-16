import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProductsController } from './users-products.controller';
import { UserProducts } from './users-products.entity';
import { UsersProductsService } from './users-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProducts])],
  controllers: [UsersProductsController],
  providers: [UsersProductsService],
})
export class UsersProductsModule {}
