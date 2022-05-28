import { Product } from '@products/product.entity';

export function createProductObject(
  product: Product,
  updatedProduct: Product = product,
) {
  updatedProduct.productName =
    product?.productName ?? updatedProduct.productName;
  updatedProduct.price = product?.price
    ? Number(product?.price)
    : updatedProduct.price;
  updatedProduct.weight = product?.weight
    ? Number(product.weight)
    : updatedProduct.weight;
  updatedProduct.count = product?.count
    ? Number(product.count)
    : updatedProduct.count;
  updatedProduct.CPU = product?.CPU ?? updatedProduct.CPU;
  updatedProduct.RAM = product?.RAM ? Number(product.RAM) : updatedProduct.RAM;
  updatedProduct.resolution = product?.resolution ?? updatedProduct.resolution;
  return updatedProduct;
}
