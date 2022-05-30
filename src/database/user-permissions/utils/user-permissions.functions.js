"use strict";
exports.__esModule = true;
exports.createUserPermissionObject = void 0;
function createUserPermissionObject(userPermission, updatedUserPermission) {
    var _a;
    if (updatedUserPermission === void 0) { updatedUserPermission = userPermission; }
    updatedUserPermission.userId =
        (_a = userPermission === null || userPermission === void 0 ? void 0 : userPermission.userId) !== null && _a !== void 0 ? _a : updatedUserPermission.userId;
    updatedUserPermission.permissionId = (userPermission === null || userPermission === void 0 ? void 0 : userPermission.permissionId)
        ? Number(userPermission === null || userPermission === void 0 ? void 0 : userPermission.permissionId)
        : updatedUserPermission.permissionId;
    return updatedUserPermission;
}
exports.createUserPermissionObject = createUserPermissionObject;
