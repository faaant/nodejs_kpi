import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  productName: string;

  @Column()
  price: number;

  @Column('real')
  weight: number;

  @Column()
  count: number;

  @Column()
  CPU: string;

  @Column()
  RAM: number;

  @Column()
  resolution: string;
}
