import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProducts } from '@users-products/users-products.entity';
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

  async addProduct(body) {
    const error = await validate(body, { skipMissingProperties: true });
    if (error.length > 0) {
      throw { message: 'Data is incorrect.' };
    }
    const userProduct = {
      userId: body?.userId,
      productId: body?.productId,
    };
    await this.pairsRepository.create(userProduct);
    await this.pairsRepository.save(userProduct);
  }

  async deleteProduct(body) {
    if (body?.userId && body?.productId) {
      throw 'Not all fields are filled';
    }
    const userProduct = {
      userId: body?.userId,
      productId: body?.productId,
    };
    await this.pairsRepository.delete(userProduct);
  }
}
