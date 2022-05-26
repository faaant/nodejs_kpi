import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
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
    private usersProductsService: UsersProductsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-users-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get('/all')
  getAll(@Res() res) {
    return this.usersProductsService.getAll().catch((err) => {
      return res.status(500).json({
        message: err?.message ?? 'Fail to get all products',
      });
    });
  }

  @Permissions('get-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getProducts(@Req() req, @Res() res) {
    const body = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof body === 'object') {
      return this.usersProductsService.getUserProducts(body?.id).catch(() => {
        return res.status(500).json({
          message: 'Fail to get products',
        });
      });
    }
    return null;
  }

  @Permissions('delete-user-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete()
  deleteProduct(@Req() request, @Res() res) {
    if (request?.body?.productId) {
      const jwtData = this.jwtTokenService.decode(
        request.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        request.body.userId = jwtData.id;
        this.usersProductsService
          .deleteProduct(request.body)
          .then(() => {
            return res.status(200).json({
              message: 'Product deleted',
            });
          })
          .catch((err) => {
            const statusCode = err?.message ? 400 : 500;
            return res.status(statusCode).json({
              message: err?.message ?? 'Fail to delete product',
            });
          });
      }
    }
  }

  @Permissions(`add-user-product`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  addProduct(@Req() request, @Res() res) {
    if (request?.body?.productId) {
      const jwtData = this.jwtTokenService.decode(
        request.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        request.body.userId = jwtData.id;
        this.usersProductsService
          .addProduct(request.body)
          .then(() => {
            return res.status(200).json({
              message: 'Product added',
            });
          })
          .catch((err) => {
            const statusCode = err?.message ? 400 : 500;
            return res.status(statusCode).json({
              message: err?.message ?? 'Fail to add product',
            });
          });
      }
    }
  }

  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  getUserProducts(@Param() params, @Res() res) {
    return this.usersProductsService.getUserProducts(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user products',
      });
    });
  }

  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  addUserProduct(@Param() params, @Req() request, @Res() res) {
    request.body.userId = params.id;
    this.usersProductsService
      .addProduct(request.body)
      .then(() => {
        return res.status(200).json({
          message: 'Product added',
        });
      })
      .catch((err) => {
        const statusCode = err?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: err?.message ?? 'Fail to add product',
        });
      });
  }

  @Permissions(`delete-product-from-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteUserProduct(@Param() params, @Req() request, @Res() res) {
    request.body.userId = params.id;
    this.usersProductsService
      .deleteProduct(request.body)
      .then(() => {
        return res.status(200).json({
          message: 'Product deleted',
        });
      })
      .catch((err) => {
        const statusCode = err?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: err?.message ?? 'Fail to delete product',
        });
      });
  }
}
