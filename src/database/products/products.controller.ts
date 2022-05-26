import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionGuard } from '@guards/permission.guard';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { Product } from '@products/products.entity';
import { ProductsService } from '@products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Permissions('create-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  createProduct(@Req() req, @Res() res) {
    this.productsService
      .createProduct(req.body)
      .then(() => {
        return res.status(200).json({
          message: 'Product created',
        });
      })
      .catch((err) => {
        const statusCode = err?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: err?.message ?? 'Fail to create product',
        });
      });
  }

  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  updateProduct(@Param() params, @Req() request, @Res() res): void {
    request.body.id = params.id;
    this.productsService
      .updateProduct(request.body)
      .then(() => {
        return res.status(200).json({
          message: 'Product updated',
        });
      })
      .catch((err) => {
        const statusCode = err?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: err?.message ?? 'Fail to update product',
        });
      });
  }

  @Permissions('delete-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteProduct(@Param() params, @Res() res): void {
    this.productsService
      .deleteProduct(params.id)
      .then(() => {
        return res.status(200).json({
          message: 'Product deleted',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err?.message ?? 'Fail to delete product',
        });
      });
  }

  @Get()
  getAllProducts(@Res() res): Promise<Product[]> {
    return this.productsService.getProducts().catch((err) => {
      return res.status(500).json({
        message: err?.message ?? 'Fail to get all products',
      });
    });
  }
}
