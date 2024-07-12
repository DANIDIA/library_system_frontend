import { getCrudOperations } from './crudOperations';
import { getDepartment } from './departmentAPIOperations';
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
    const userDataResponse = makeUserStatusBoolValue(
        await operations.getData(id),
    );

    if (!userDataResponse.ok || !userDataResponse.data.departmentID) {
        return userDataResponse;
    }

    const departmentDataResponse = await getDepartment(
        userDataResponse.data.departmentID,
    );

    if (!departmentDataResponse.ok) return departmentDataResponse;

    return {
        ...userDataResponse.data,
        departmentData: departmentDataResponse.data,
    };
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
