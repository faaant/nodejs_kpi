import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { BasketsDto } from '@baskets/dto';
import { Baskets } from '@database/entities/baskets.entity';

@Injectable()
export class BasketsService {
  constructor(
    @InjectRepository(Baskets)
    private pairsRepository: Repository<BasketsDto>,
  ) {}

  async getAll(): Promise<BasketsDto[]> {
    return this.pairsRepository.find();
  }

  async getBaskets(_id: string): Promise<BasketsDto[]> {
    return this.pairsRepository.find({
      select: ['productId'],
      where: [{ userId: _id }],
    });
  }

  async getUserProductId(
    _userId: string,
    _productId: string,
  ): Promise<BasketsDto[]> {
    return this.pairsRepository.find({
      select: ['productId'],
      where: [{ userId: _userId, productId: _productId }],
    });
  }

  async addProduct(baskets: BasketsDto): Promise<BasketsDto> {
    const error = await validate(baskets, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.pairsRepository.create(baskets);
    await this.pairsRepository.save(baskets);
    return baskets;
  }

  async deleteProduct(baskets: BasketsDto): Promise<BasketsDto> {
    const error = await validate(baskets, { skipMissingProperties: true });
    if (error.length > 0) {
      throw new BadRequestException();
    }
    await this.pairsRepository.delete(baskets);
    return baskets;
  }
}
