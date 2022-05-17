import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersProductsService } from './users-products.service';

@Controller('users-products')
export class UsersProductsController {
  constructor(private service: UsersProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param() params) {
    return this.service.getUserProducts(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addProduct(@Param() params, @Req() request: Request) {
    if (request?.body?.productId) {
      const userProduct = request.body;
      userProduct.userId = params.id;
      this.service.addProduct(request.body);
      return `This action add new product to the list`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
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
