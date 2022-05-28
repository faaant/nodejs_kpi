import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '@products/product.entity';
import { User } from '@users/user.entity';

@Entity()
export class UserProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @ManyToOne((type) => User, (user) => user)
  user: User;

  @ManyToOne((type) => Product, (product) => product)
  product: Product;
}
