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

import { PermissionGuard } from '@guards/permission.guard';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { JWTTokenService } from '@shared/jwt-token.service';
import { UsersProductsService } from '@users-products/users-products.service';

@Controller('list/products')
export class UsersProductsController {
  constructor(
    private service: UsersProductsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-users-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get('/all')
  getAll() {
    return this.service.getAll();
  }

  @Permissions('get-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getProducts(@Req() req) {
    const body = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof body === 'object') {
      return this.service.getUserProducts(body?.id);
    }
    return null;
  }

  @Permissions('delete-user-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete()
  deleteProduct(@Req() request) {
    if (request?.body?.productId) {
      const jwtData = this.jwtTokenService.decode(
        request.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        const userProduct = {
          userId: jwtData.id,
          productId: request.body.productId,
        };
        this.service.deleteProduct(userProduct);
      }
      return `This action delete product from user's list`;
    }
  }

  @Permissions(`add-user-product`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  addProduct(@Req() request) {
    if (request?.body?.productId) {
      const jwtData = this.jwtTokenService.decode(
        request.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        const userProduct = {
          userId: jwtData.id,
          productId: request.body.productId,
        };
        this.service.addProduct(userProduct);
      }
      return `This action add new product to the list`;
    }
  }

  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  get(@Param() params) {
    return this.service.getUserProducts(params.id);
  }

  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  addUserProduct(@Param() params, @Req() request) {
    const userProduct = request.body;
    userProduct.userId = params.id;
    this.service.addProduct(request.body);
    return `This action add new product to the list`;
  }

  @Permissions(`delete-product-from-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteUserProduct(@Param() params, @Req() request) {
    const userProduct = request.body;
    userProduct.userId = params.id;
    const id = this.service.getUserProductId(params.id, request.body.productId);
    this.service.deleteProduct(userProduct);
    return `This action delete product from user's list`;
  }
}
