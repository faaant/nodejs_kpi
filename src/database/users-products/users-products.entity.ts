import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '@products/products.entity';
import { User } from '@user/user.entity';

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
