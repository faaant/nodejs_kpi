import { IsNotEmpty } from 'class-validator';
import { UserPermissionsDto } from '@user-permissions/dto';

export class UserPermissionsDbDto extends UserPermissionsDto {
  @IsNotEmpty({
    message: 'UserId must be not empty',
  })
  id?: number;
}
