import { PermissionGuard } from '@guards/permission.guard';
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

import { Product } from '@products/product.entity';
import { ProductsService } from '@products/products.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { createProductObject } from './utils/product.functions';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Permissions('create-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  createProduct(@Req() req, @Res() res) {
    const product = new Product();
    createProductObject(req.body, product);
    this.productsService
      .createProduct(product)
      .then(() => {
        return res.status(200).json(product);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || 'Server error. Product have not created.');
      });
  }

  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateProduct(@Param() params, @Req() req, @Res() res) {
    const product: Product = await this.productsService.getProduct(params.id);
    createProductObject(req.body, product);
    this.productsService
      .updateProduct(product)
      .then(() => {
        return res.status(200).json(product);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || 'Server error. Product have not updated.');
      });
  }

  @Permissions('delete-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteProduct(@Param() params, @Res() res): void {
    this.productsService
      .deleteProduct(params.id)
      .then(() => {
        return res
          .status(200)
          .json({ message: 'Product successfully deleted' });
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || 'Server error. Product have not deleted.');
      });
  }

  @Get()
  getAllProducts(@Res() res): Promise<Product[]> {
    return this.productsService
      .getProducts()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res
          .status(error?.message ? 400 : 500)
          .json(error?.message || `Server error. Can't get products.`);
      });
  }
}
