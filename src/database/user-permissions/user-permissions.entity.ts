import { IsNotEmpty } from 'class-validator';
import { Permission } from 'src/database/permissions/permissions.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

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
