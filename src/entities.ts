import { Permission } from '@permissions/permissions.entity';
import { Product } from '@products/products.entity';
import { UserPermissions } from '@user-permissions/user-permissions.entity';
import { User } from '@user/user.entity';
import { UserProducts } from '@users-products/users-products.entity';

const entities = [User, Permission, Product, UserProducts, UserPermissions];

export default entities;
