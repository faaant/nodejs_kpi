import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProduct(@Req() request: Request) {
    if (request?.body?.productName && request?.body?.price) {
      this.service.createProduct(request.body);
      return `This action create a product`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateProduct(@Param() params, @Req() request: Request): string {
    if (request?.body?.productName && request?.body?.price) {
      this.service.updateProduct(request.body);
      return `This action update a #${params.id} product`;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteProduct(@Param() params): string {
    this.service.deleteProduct(params.id);
    return `This action delete a #${params.id} product`;
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.service.getProducts();
  }
}
