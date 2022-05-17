import { Product } from 'src/products/products.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
