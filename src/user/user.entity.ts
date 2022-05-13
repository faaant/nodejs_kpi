import { Role } from 'src/role/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne((type) => Role, (role) => role.id)
  role: number;
}
