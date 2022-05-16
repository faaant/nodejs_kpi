import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column()
  role: string;
}
