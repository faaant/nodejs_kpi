import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  createProduct(@Req() request: Request) {
    if (request?.body?.productName && request?.body?.price) {
      this.service.createProduct(request.body);
      return `This action create a product`;
    }
  }

  @Put(':id')
  updateProduct(@Param() params, @Req() request: Request): string {
    if (request?.body?.productName && request?.body?.price) {
      this.service.updateProduct(request.body);
      return `This action update a #${params.id} product`;
    }
  }

  @Delete(':id')
  deleteProduct(@Param() params): string {
    this.service.deleteProduct(params.id);
    return `This action delete a #${params.id} product`;
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.service.getProducts();
  }
}
