import { UserProducts } from '@users-products/user-products.entity';

export function createUserProductObject(
  userProduct: UserProducts,
  updatedUserProduct: UserProducts = userProduct,
) {
  updatedUserProduct.userId = userProduct?.userId ?? updatedUserProduct.userId;
  updatedUserProduct.productId =
    userProduct?.productId ?? updatedUserProduct.productId;
  return updatedUserProduct;
}
