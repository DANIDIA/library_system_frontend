import { roles } from '../../../../../shared';

export const rolesPermissionLevel = Object.freeze({
    [roles.ADMIN]: 3,
    [roles.DEPARTMENT_MANAGER]: 2,
    [roles.LIBRARIAN]: 1,
});
