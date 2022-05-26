import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@products/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getProduct(_id: string): Promise<Product[]> {
    return await this.productsRepository.find({
      select: ['id', 'productName', 'price'],
      where: [{ id: _id }],
    });
  }

  async updateProduct(product: Product) {
    if (!this.validateProduct(product)) {
      throw { message: 'Not all fields are filled' };
    }
    this.productsRepository.update(product.id, product);
  }

  async deleteProduct(id: string) {
    this.productsRepository.delete(id);
  }

  async createProduct(body: Product) {
    if (!this.validateProduct(body)) {
      throw { message: 'Not all fields are filled' };
    }
    const product = {
      productName: body?.productName,
      price: body?.price,
      weight: body?.weight,
      count: body?.count,
    };
    this.productsRepository.create(product);
    this.productsRepository.save(product);
  }

  public validateProduct(body: any) {
    return body?.productName && body?.price && body?.weight && body?.count;
  }
}
