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

import { PermissionGuard } from '@guards/permission.guard';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { Product } from '@products/products.entity';
import { ProductsService } from '@products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Permissions('create-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  createProduct(@Req() request) {
    this.service.createProduct(request.body);
    return `This action create a product`;
  }

  @Permissions('update-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Put(':id')
  updateProduct(@Param() params, @Req() request): string {
    request.body.id = params.id;
    this.service.updateProduct(request.body);
    return `This action update a #${params.id} product`;
  }

  @Permissions('delete-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
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
