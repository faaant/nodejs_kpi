import { Role } from 'src/role/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column('int',{default:1})
  roleId: number;

  @ManyToOne((type) => Role, (role) => role)
  role: Role;
}
