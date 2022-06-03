import { Baskets } from '@baskets/baskets.entity';
import { Permission } from '@permissions/permissions.entity';
import { Product } from '@products/product.entity';
import { UserPermissions } from '@user-permissions/user-permissions.entity';
import { User } from '@users/user.entity';

const entities = [User, Product, Baskets, UserPermissions, Permission];

export default entities;
