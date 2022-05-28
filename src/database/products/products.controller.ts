import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Product } from '@products/product.entity';
import { ProductsService } from '@products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  createProduct(@Req() req, @Res() res) {
    const product = new Product();
    product.productName = req.body?.productName;
    product.price = Number(req.body?.price);
    product.weight = Number(req.body?.weight);
    product.count = Number(req.body?.count);
    this.productsService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(@Param() params, @Req() req, @Res() res) {
    const product: Product = await this.productsService.getProduct(params.id);
    product.productName = req.body?.productName ?? product.productName;
    product.price = Number(req.body?.price) ?? product.price;
    product.weight = Number(req.body?.weight) ?? product.weight;
    product.count = Number(req.body?.count) ?? product.count;
    this.productsService.updateProduct(product);
  }

  @Delete(':id')
  deleteProduct(@Param() params, @Res() res): void {
    this.productsService.deleteProduct(params.id);
  }

  @Get()
  getAllProducts(@Res() res): Promise<Product[]> {
    return this.productsService.getProducts();
  }
}
