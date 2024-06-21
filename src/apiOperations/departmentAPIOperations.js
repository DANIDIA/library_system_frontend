import { getCrudOperations } from './crudOperations';
import { apiPaths, departmentDataNames } from './shared';

const operations = getCrudOperations(apiPaths.DEPARTMENTS);

export async function createDepartment(data) {
    return await operations.create(data);
}

export async function queryDepartments(queryParams) {
    return await operations.query(queryParams);
}

export async function getDepartment(id) {
    return await operations.getData(id);
}

export async function getTotalBooksAmountInDepartment(id) {
    return await operations.getData(id, departmentDataNames.TOTAL_BOOKS_AMOUNT);
}

export async function getGivenBooksAmountInDepartment(id) {
    return await operations.getData(id, departmentDataNames.GIVEN_BOOKS_AMOUNT);
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
