import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

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
    this.productsRepository.update(product.id, product);
  }

  async deleteProduct(id: string) {
    this.productsRepository.delete(id);
  }

  async createProduct(product: Product) {
    this.productsRepository.create(product);
    this.productsRepository.save(product);
  }
}
