import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({
    message: 'Product name must be not empty',
  })
  productName: string;

  @Column()
  @IsNotEmpty({
    message: 'Price must be not empty',
  })
  @IsNumber()
  price: number;

  @Column()
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
}
