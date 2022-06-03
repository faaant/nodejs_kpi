import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { Baskets } from '@baskets/baskets.entity';

@Injectable()
export class BasketsService {
  constructor(
    @InjectRepository(Baskets)
    private pairsRepository: Repository<Baskets>,
  ) {}

  async getAll(): Promise<Baskets[]> {
    return await this.pairsRepository.find();
  }

  async getBaskets(_id: string): Promise<Baskets[]> {
    return await this.pairsRepository.find({
      select: ['productId'],
      where: [{ userId: _id }],
    });
  }

  async getUserProductId(
    _userId: string,
    _productId: string,
  ): Promise<Baskets[]> {
    return await this.pairsRepository.find({
      select: ['productId'],
      where: [{ userId: _userId, productId: _productId }],
    });
  }

  async addProduct(baskets: Baskets) {
    const error = await validate(baskets, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.pairsRepository.create(baskets);
    await this.pairsRepository.save(baskets);
  }

  async deleteProduct(baskets: Baskets) {
    const error = await validate(baskets, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.pairsRepository.delete(baskets);
  }
}
