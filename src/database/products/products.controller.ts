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
import { createProductObject } from '@products/utils/product.functions';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Permissions('create-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  async createProduct(@Req() req: Request) {
    const product = new Product();
    createProductObject(req.body, product);
    return await this.productsService.createProduct(product);
  }

  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateProduct(@Param() params: { id: string }, @Req() req: Request) {
    const product: Product = await this.productsService.getProduct(params.id);
    createProductObject(req.body, product);
    return await this.productsService.updateProduct(product);
  }

  @Permissions('delete-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteProduct(@Param() params: { id: string }) {
    return await this.productsService.deleteProduct(params.id);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }
}
