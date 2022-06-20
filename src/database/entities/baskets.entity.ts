import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '@database/entities/product.entity';
import { User } from '@database/entities/user.entity';

@Entity()
export class Baskets {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId?: string;

  @Column()
  productId?: string;

  @ManyToOne(() => User, (user) => user)
  user?: User;

  @ManyToOne(() => Product, (product) => product)
  product?: Product;
}
