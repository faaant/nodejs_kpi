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

  async addProduct(userProducts: UserProducts) {
    const error = await validate(userProducts, { skipMissingProperties: true });
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }
    const userProduct = {
      userId: userProducts?.userId,
      productId: userProducts?.productId,
    };
    await this.pairsRepository.create(userProduct);
    await this.pairsRepository.save(userProduct);
  }

  async deleteProduct(userProducts: UserProducts) {
    const error = await validate(userProducts, { skipMissingProperties: true });
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }
    const userProduct = {
      userId: userProducts?.userId,
      productId: userProducts?.productId,
    };
    await this.pairsRepository.delete(userProduct);
  }
}
