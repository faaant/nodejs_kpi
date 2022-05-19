import { Permission } from './database/permissions/permissions.entity';
import { Product } from './database/products/products.entity';
import { UserPermissions } from './database/user-permissions/user-permissions.entity';
import { User } from './database/user/user.entity';
import { UserProducts } from './database/users-products/users-products.entity';

const entities = [User, Permission, Product, UserProducts, UserPermissions];

export default entities;
