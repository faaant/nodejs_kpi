import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersProductsService } from './users-products.service';

@Controller('users-products')
export class UsersProductsController {
  constructor(private service: UsersProductsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUserProducts(params.id);
  }

  @Post(':id')
  addProduct(@Param() params, @Req() request: Request) {
    console.log(request?.body?.productId);
    if (request?.body?.productId) {
      const userProduct = request.body;
      userProduct.userId = params.id;
      this.service.addProduct(request.body);
      return `This action add new product to the list`;
    }
  }

  @Delete(':id')
  deleteProduct(@Param() params, @Req() request: Request) {
    if (request?.body?.productId) {
      const userProduct = request.body;
      userProduct.userId = params.id;
      const id = this.service.getUserProductId(
        params.id,
        request.body.productId,
      );
      this.service.deleteProduct(userProduct);
      return `This action delete product from user's list`;
    }
  }
}
