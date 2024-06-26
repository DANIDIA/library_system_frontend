import { getCrudOperations } from './crudOperations';
import { resources } from './shared';

const operations = getCrudOperations(resources.USERS);

export async function createUser(data) {
    return await operations.create(data);
}

export async function queryUsers(
    queryParams,
    pageSize = null,
    pageNumber = null,
) {
    return await operations.query(queryParams, pageSize, pageNumber);
}

export async function getUser(id) {
    return await operations.getData(id);
}

export async function updateUser(id, data) {
    return await operations.update(id, data);
}

export async function deleteUser(id) {
    return await operations.delete(id);
}
