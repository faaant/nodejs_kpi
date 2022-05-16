import { Product } from './products/products.entity';
import { Role } from './role/role.entity';
import { User } from './user/user.entity';
import { UserProducts } from './users-products/users-products.entity';

const entities = [User, Role, Product, UserProducts];

export default entities;
