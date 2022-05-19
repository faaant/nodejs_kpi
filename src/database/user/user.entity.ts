import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '../permissions/permissions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('int', { default: 1 })
  permissionId: number;

  @OneToMany((type) => Permission, (permission) => permission)
  permission: Permission;
}
