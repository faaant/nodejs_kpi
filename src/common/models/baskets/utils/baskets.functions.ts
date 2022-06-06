import { BasketsDto } from '@baskets/dto';

export function createBasketObject(
  basket: BasketsDto,
  updatedBasket: BasketsDto = basket,
) {
  updatedBasket.userId = basket?.userId ?? updatedBasket.userId;
  updatedBasket.productId = basket?.productId ?? updatedBasket.productId;
  return updatedBasket;
}
