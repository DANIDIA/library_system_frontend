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
    return makeUserStatusBoolValue(
        await operations.query(queryParams, pageSize, pageNumber),
    );
}

export async function getUser(id) {
    return makeUserStatusBoolValue(await operations.getData(id));
}

export async function getUserAuthData(id) {
    return await operations.getData(id, 'auth-data');
}

export async function updateUser(id, data) {
    return await operations.update(id, data);
}

export async function deleteUser(id) {
    return await operations.delete(id);
}

function makeUserStatusBoolValue(response) {
    if (Object.hasOwn(response.data, 'results')) {
        response.data.results.forEach((val) => (val.status = !!val.status));
    } else if (response.data) {
        response.data.status = !!response.data.status;
    }

    return response;
}
