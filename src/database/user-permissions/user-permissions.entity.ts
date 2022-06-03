import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '@permissions/permissions.entity';
import { User } from '@users/user.entity';
import { IsNotEmpty } from 'class-validator';

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
    message: 'permissionId must be not empty',
  })
  permissionId: number;

  @ManyToOne(() => Permission, (permission) => permission)
  permission: Permission;

  @ManyToOne(() => User, (user) => user)
  user: User;
}
