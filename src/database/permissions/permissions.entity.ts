import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id?: number;

  @Column()
  permission?: string;
}
