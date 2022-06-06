import { IsNotEmpty } from 'class-validator';
export class UserPermissionsDto {
  @IsNotEmpty({
    message: 'UserId must be not empty',
  })
  userId?: string;

  @IsNotEmpty({
    message: 'permissionId must be not empty',
  })
  permissionId?: number;
}
