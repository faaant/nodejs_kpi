import { Permission } from '@permissions/permissions.entity';
import { Product } from '@products/product.entity';
import { UserProducts } from '@users-products/users-products.entity';
import { User } from '@users/user.entity';

const entities = [User, Product, UserProducts, Permission];

export default entities;
