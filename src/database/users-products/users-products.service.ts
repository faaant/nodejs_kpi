import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProducts } from '@users-products/user-products.entity';
import { validate } from 'class-validator';

@Injectable()
export class UsersProductsService {
  constructor(
    @InjectRepository(UserProducts)
    private pairsRepository: Repository<UserProducts>,
  ) {}

  async getAll(): Promise<UserProducts[]> {
    return await this.pairsRepository.find();
  }

  async getUserProducts(_id: string): Promise<UserProducts[]> {
    return await this.pairsRepository.find({
      select: ['productId'],
      where: [{ userId: _id }],
    });
  }

  async getUserProductId(
    _userId: string,
    _productId: string,
  ): Promise<UserProducts[]> {
    return await this.pairsRepository.find({
      select: ['productId'],
      where: [{ userId: _userId, productId: _productId }],
    });
  }

  async addProduct(userProduct: UserProducts): Promise<UserProducts> {
    const error = await validate(userProduct, { skipMissingProperties: true });
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }

    await this.pairsRepository.create(userProduct);
    await this.pairsRepository.save(userProduct);
    return userProduct;
  }

  async deleteProduct(userProduct: UserProducts): Promise<UserProducts> {
    const error = await validate(userProduct, { skipMissingProperties: true });
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }
    await this.pairsRepository.delete(userProduct);
    return userProduct;
  }
}
