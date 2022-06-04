import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '@products/product.entity';
import { User } from '@users/user.entity';

@Entity()
export class Baskets {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @IsNotEmpty({
    message: 'UserId must be not empty',
  })
  userId?: string;

  @Column()
  @IsNotEmpty({
    message: 'ProductId must be not empty',
  })
  productId?: string;

  @ManyToOne(() => User, (user) => user)
  user?: User;

  @ManyToOne(() => Product, (product) => product)
  product?: Product;
}
