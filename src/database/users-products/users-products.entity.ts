import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/products.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({
    message: 'UserId must be not empty',
  })
  userId: string;

  @Column()
  @IsNotEmpty({
    message: 'ProductId must be not empty',
  })
  productId: string;

  @ManyToOne((type) => User, (user) => user)
  user: User;

  @ManyToOne((type) => Product, (product) => product)
  product: Product;
}
