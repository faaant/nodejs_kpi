import { PermissionGuard } from '@guards/permission.guard';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductDto, ProductDbDto } from '@products/dto';
import { ProductsService } from '@products/products.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { createProductObject } from '@products/utils/product.functions';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(200)
  @Permissions('create-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  async createProduct(@Req() req: Request): Promise<ProductDto> {
    const product = new ProductDto();
    createProductObject(req.body, product);
    return this.productsService.createProduct(product);
  }

  @HttpCode(200)
  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  async updateProduct(
    @Param() params: { id: string },
    @Req() req: Request,
  ): Promise<ProductDbDto> {
    const product: ProductDbDto = await this.productsService.getProduct(
      params.id,
    );
    product.id = params.id;
    createProductObject(req.body, product);
    return this.productsService.updateProduct(product);
  }

  @HttpCode(200)
  @Permissions('delete-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteProduct(@Param() params: { id: string }): Promise<ProductDto> {
    return this.productsService.deleteProduct(params.id);
  }

  @HttpCode(200)
  @Get(':id')
  async getProduct(@Param() params: { id: string }): Promise<ProductDto> {
    return this.productsService.getProduct(params.id);
  }

  @HttpCode(200)
  @Get()
  async getAllProducts(): Promise<ProductDbDto[]> {
    return this.productsService.getProducts();
  }
}
