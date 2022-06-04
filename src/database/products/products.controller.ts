import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Product } from '@products/product.entity';
import { ProductsService } from '@products/products.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { createProductObject } from '@products/utils/product.functions';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Permissions('create-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Post()
  createProduct(@Body() product: Product): Promise<Product> {
    const newProduct = new Product();
    createProductObject(product, newProduct);
    return this.productsService.createProduct(newProduct);
  }

  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Put(':id')
  async updateProduct(
    @Param() params: { id: string },
    @Body() product: Product,
  ): Promise<Product> {
    const updatedProduct: Product = await this.productsService.getProduct(
      params.id,
    );
    createProductObject(product, updatedProduct);
    return await this.productsService.updateProduct(updatedProduct);
  }

  @Permissions('delete-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Param() params: { id: string }): Promise<Product> {
    return await this.productsService.deleteProduct(params.id);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }
}
