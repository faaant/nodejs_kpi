import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../../guards/permission.guard';
import { Permissions } from '../../shared/decorators/permissions.decorator';
import { JWTTokenService } from '../../shared/jwt-key.service';
import { UsersProductsService } from './users-products.service';

@Controller('list/products')
export class UsersProductsController {
  constructor(
    private service: UsersProductsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getUserProducts(@Request() req) {
    const body = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof body === 'object') {
      return this.service.getUserProducts(body?.id);
    }
    return null;
  }

  @Permissions('get-users-lists')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get('/all')
  getAll() {
    return this.service.getAll();
  }

  @Permissions('get-user-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  get(@Param() params) {
    return this.service.getUserProducts(params.id);
  }

  @Permissions('add-product-to-user-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  addProduct(@Param() params, @Request() request) {
    if (request?.body?.productId) {
      const userProduct = request.body;
      userProduct.userId = params.id;
      this.service.addProduct(request.body);
      return `This action add new product to the list`;
    }
  }

  @Permissions('delete-product-from-user-list')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteProduct(@Param() params, @Request() request) {
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
