import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@user/user.entity';
import { Permission } from '@permissions/permissions.entity';

@Entity()
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  permissionId: number;

  @ManyToOne((type) => Permission, (permission) => permission)
  permission: Permission;

  @ManyToOne((type) => User, (user) => user)
  user: User;
}
