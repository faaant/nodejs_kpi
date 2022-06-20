import { IsNotEmpty } from 'class-validator';

export class BasketsDto {
  @IsNotEmpty({
    message: 'UserId must be not empty',
  })
  userId?: string;

  @IsNotEmpty({
    message: 'ProductId must be not empty',
  })
  productId?: string;
}
