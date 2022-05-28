import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '@permissions/permissions.entity';
import { User } from '@users/user.entity';

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
