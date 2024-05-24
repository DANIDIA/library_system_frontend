import { getCrudOperations } from './crudOperations';
import { apiPaths } from './shared';

const operations = getCrudOperations(apiPaths.DEPARTMENTS);

export async function createDepartment(sessionID, data) {
    return await operations.create(sessionID, data);
}

export async function queryDepartments(sessionID, queryParams) {
    return await operations.read(sessionID, queryParams);
}

export async function updateDepartment(sessionID, departmentID, newValues) {
    return await operations.update(sessionID, departmentID, newValues);
}

export async function deleteDepartment(sessionID, departmentID) {
    return await operations.delete(sessionID, departmentID);
}
