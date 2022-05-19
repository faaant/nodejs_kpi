import { Permission } from 'src/database/permissions/permissions.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  permissionId: number;

  @ManyToOne((type) => Permission, (permission) => permission)
  permision: Permission;

  @ManyToOne((type) => User, (user) => user)
  user: User;
}
