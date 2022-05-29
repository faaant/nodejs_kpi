import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty({
    message: 'Product name must be not empty',
  })
  productName: string;

  @Column()
  @IsNotEmpty({
    message: 'Price name must be not empty',
  })
  @IsNumber()
  price: number;

  @Column('real')
  @IsNotEmpty({
    message: 'Weight must be not empty',
  })
  @IsNumber()
  weight: number;

  @Column()
  @IsNotEmpty({
    message: 'Count must be not empty',
  })
  @IsNumber()
  count: number;

  @Column()
  @IsNotEmpty({
    message: 'CPU must be not empty',
  })
  CPU: string;

  @Column()
  @IsNotEmpty({
    message: 'RAM must be not empty',
  })
  @IsNumber()
  RAM: number;

  @Column()
  @IsNotEmpty({
    message: 'Resolution must be not empty',
  })
  resolution: string;
}
