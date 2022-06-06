import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductDto, ProductDbDto } from '@products/dto';
import { validate } from 'class-validator';
import { Product } from '@database/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<ProductDto>,
  ) {}

  async getProducts(): Promise<ProductDbDto[]> {
    return this.productsRepository.find();
  }

  async getProduct(_id: string): Promise<ProductDto> {
    return (
      await this.productsRepository.find({
        select: [
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

  async updateProduct(product: ProductDbDto): Promise<ProductDbDto> {
    const error = await validate(product, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    if (!product?.id) {
      throw new BadRequestException();
    }
    await this.productsRepository.update(product.id, product);
    return product;
  }

  async deleteProduct(id: string): Promise<ProductDto> {
    const product: ProductDto = await this.getProduct(id);
    await this.productsRepository.delete(id);
    return product;
  }

  async createProduct(product: ProductDto): Promise<ProductDto> {
    const error = await validate(product);
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.productsRepository.create(product);
    await this.productsRepository.save(product);
    return product;
  }
}
