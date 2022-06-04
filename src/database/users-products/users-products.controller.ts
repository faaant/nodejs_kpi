import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  HttpCode,
  Body,
} from '@nestjs/common';
import { UsersProductsService } from '@users-products/users-products.service';
import { UserProducts } from '@users-products/user-products.entity';
import { AuthGuard } from '@nestjs/passport';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { createUserProductObject } from '@users-products/utils/users-products.functions';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('list/products')
export class UsersProductsController {
  constructor(
    private usersProductsService: UsersProductsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-users-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Get('/all')
  async getAll(): Promise<UserProducts[]> {
    return await this.usersProductsService.getAll();
  }

  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Get(':id')
  async getUserProducts(
    @Param() params: { id: string },
  ): Promise<UserProducts[]> {
    return await this.usersProductsService.getUserProducts(params.id);
  }

  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
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

  @Permissions(`delete-product-from-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
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
