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
import { JWTTokenService } from 'src/shared/jwt-key.service';
import { UserService } from 'src/user/users.service';
import { UsersProductsService } from './users-products.service';

@Controller('list/products')
export class UsersProductsController {
  constructor(
    private service: UsersProductsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
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
  addProduct(@Param() params, @Request() request) {
    if (request?.body?.productId) {
      const userProduct = request.body;
      userProduct.userId = params.id;
      this.service.addProduct(request.body);
      return `This action add new product to the list`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
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
