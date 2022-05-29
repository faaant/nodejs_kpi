import { Permission } from '@permissions/permissions.entity';
import { Product } from '@products/product.entity';
import { UserPermissions } from '@user-permissions/user-permissions.entity';
import { UserProducts } from '@users-products/user-products.entity';
import { User } from '@users/user.entity';

const entities = [User, Product, UserProducts, UserPermissions, Permission];

export default entities;
