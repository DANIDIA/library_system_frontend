import { getCrudOperations } from './crudOperations';
import { departmentDataNames, resources } from './shared';

const operations = getCrudOperations(resources.DEPARTMENTS);

export async function createDepartment(data) {
    return await operations.create(data);
}

export async function queryDepartments(queryParams) {
    return await operations.query(queryParams);
}

export async function getDepartment(id) {
    return await operations.getData(id);
}

export async function getBooksDetailsInDepartment(id) {
    const totalBooksResponse = await operations.getData(
        id,
        departmentDataNames.TOTAL_BOOKS_AMOUNT,
    );
    const givenBooksResponse = await operations.getData(
        id,
        departmentDataNames.GIVEN_BOOKS_AMOUNT,
    );

    if (!totalBooksResponse.ok) return totalBooksResponse;
    if (!givenBooksResponse.ok) return givenBooksResponse;

    return {
        ok: true,
        data: { ...totalBooksResponse.data, ...givenBooksResponse.data },
    };
}

export async function getEmployeeAmountInDepartment(id) {
    return await operations.getData(id, departmentDataNames.EMPLOYEES_AMOUNT);
}

export async function updateDepartment(id, newValues) {
    return await operations.update(id, newValues);
}

export async function deleteDepartment(id) {
    return await operations.delete(id);
}
