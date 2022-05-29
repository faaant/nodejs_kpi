import { UserPermissions } from '../user-permissions.entity';

export function createUserPermissionObject(
  userPermission: UserPermissions,
  updatedUserPermission: UserPermissions = userPermission,
) {
  updatedUserPermission.userId =
    userPermission?.userId ?? updatedUserPermission.userId;
  updatedUserPermission.permissionId = userPermission?.permissionId
    ? Number(userPermission?.permissionId)
    : updatedUserPermission.permissionId;
  return updatedUserPermission;
}
