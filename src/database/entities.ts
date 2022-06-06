import { Baskets } from '@database/entities/baskets.entity';
import { Permission } from '@database/entities/permissions.entity';
import { Product } from '@database/entities/product.entity';
import { UserPermissions } from '@database/entities/user-permissions.entity';
import { User } from '@database/entities/user.entity';

const entities = [User, Product, Baskets, UserPermissions, Permission];

export default entities;
