import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UsersProductsService } from '@users-products/users-products.service';
import { UserProducts } from '@users-products/user-products.entity';
import { createUserProductObject } from './utils/user-products.functions';

@Controller('list/products')
export class UsersProductsController {
  constructor(private usersProductsService: UsersProductsService) {}

  @HttpCode(200)
  @Get('/all')
  async getAll(): Promise<UserProducts[]> {
    return await this.usersProductsService.getAll();
  }

  @HttpCode(200)
  @Get(':id')
  async getUserProducts(
    @Param() params: { id: string },
  ): Promise<UserProducts[]> {
    return await this.usersProductsService.getUserProducts(params.id);
  }

  @HttpCode(200)
  @Post(':id')
  async addUserProduct(
    @Param() params: { id: string },
    @Body() body: UserProducts,
  ): Promise<UserProducts> {
    const userProduct = new UserProducts();
    body.userId = params.id;
    createUserProductObject(body, userProduct);
    return await this.usersProductsService.addProduct(userProduct);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteUserProduct(
    @Param() params: { id: string },
    @Body() body: UserProducts,
  ): Promise<UserProducts> {
    const userProduct = new UserProducts();
    body.userId = params.id;
    createUserProductObject(body, userProduct);
    return await this.usersProductsService.deleteProduct(userProduct);
  }
}
