import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Product } from '@products/product.entity';
import { ProductsService } from '@products/products.service';
import { createProductObject } from './utils/product.functions';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(200)
  @Post()
  createProduct(@Body() product: Product): Promise<Product> {
    const newProduct = new Product();
    createProductObject(product, newProduct);
    return this.productsService.createProduct(newProduct);
  }

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
    return this.productsService.updateProduct(updatedProduct);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Param() params: { id: string }): Promise<Product> {
    return await this.productsService.deleteProduct(params.id);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param() params: { id: string }): Promise<Product> {
    return this.productsService.getProduct(params.id);
  }
}
