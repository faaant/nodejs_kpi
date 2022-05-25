import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { User } from '@user/user.entity';
import { Permission } from '@permissions/permissions.entity';

@Entity()
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({
    message: 'UserId must be not empty',
  })
  userId: string;

  @Column()
  @IsNotEmpty({
    message: 'Permission must be not empty',
  })
  permissionId: number;

  @ManyToOne((type) => Permission, (permission) => permission)
  permission: Permission;

  @ManyToOne((type) => User, (user) => user)
  user: User;
}
