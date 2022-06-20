import { UserPermissionsDto } from '@user-permissions/dto';

export function createUserPermissionObject(
  userPermission: UserPermissionsDto,
  updatedUserPermission: UserPermissionsDto = userPermission,
) {
  updatedUserPermission.userId =
    userPermission?.userId ?? updatedUserPermission.userId;
  updatedUserPermission.permissionId = userPermission?.permissionId
    ? Number(userPermission?.permissionId)
    : updatedUserPermission.permissionId;
  return updatedUserPermission;
}
