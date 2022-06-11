import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@products/product.entity';
import { validate } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getProduct(_id: string): Promise<Product> {
    return (
      await this.productsRepository.find({
        select: [
          'id',
          'productName',
          'price',
          'weight',
          'count',
          'CPU',
          'RAM',
          'resolution',
        ],
        where: [{ id: _id }],
      })
    )[0];
  }

  async updateProduct(product: Product): Promise<Product> {
    const error = await validate(product, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.productsRepository.save(product);
    return product;
  }

  async deleteProduct(id: string): Promise<Product> {
    const product: Product = await this.getProduct(id);
    await this.productsRepository.delete(id);
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    const error = await validate(product);
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.productsRepository.create(product);
    await this.productsRepository.save(product);
    return product;
  }
}
