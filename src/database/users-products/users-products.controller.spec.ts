import { Test, TestingModule } from '@nestjs/testing';
import { UsersProductsController } from './users-products.controller';

describe('UsersProductsController', () => {
  let controller: UsersProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersProductsController],
    }).compile();

    controller = module.get<UsersProductsController>(UsersProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
