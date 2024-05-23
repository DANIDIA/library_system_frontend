import { fetchAPI } from './fetchAPI';

export async function createDepartment(sessionID, data) {
    return await fetchAPI(sessionID, 'post', 'departments/add', data);
}

export async function queryDepartments(sessionID, queryParams) {
    return await fetchAPI(sessionID, 'get', 'departments/get', {
        ...queryParams,
    });
}

export async function deleteDepartment(sessionID, departmentID) {
    return await fetchAPI(sessionID, 'delete', 'departments/remove', {
        sessionID,
        id: departmentID,
    });
}
