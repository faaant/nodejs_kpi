import { Test, TestingModule } from '@nestjs/testing';
import { UsersProductsService } from './users-products.service';

describe('UsersProductsService', () => {
  let service: UsersProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersProductsService],
    }).compile();

    service = module.get<UsersProductsService>(UsersProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
