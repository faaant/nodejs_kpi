import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '@database/entities/permissions.entity';
import { User } from '@database/entities/user.entity';

@Entity()
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId?: string;

  @Column()
  permissionId?: number;

  @ManyToOne(() => Permission, (permission) => permission)
  permission?: Permission;

  @ManyToOne(() => User, (user) => user)
  user?: User;
}
