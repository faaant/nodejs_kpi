import { Baskets } from '@baskets/baskets.entity';

export function createBasketObject(
  basket: Baskets,
  updatedBasket: Baskets = basket,
) {
  updatedBasket.userId = basket?.userId ?? updatedBasket.userId;
  updatedBasket.productId = basket?.productId ?? updatedBasket.productId;
  return updatedBasket;
}
