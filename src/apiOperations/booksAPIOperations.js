import { getCrudOperations } from './crudOperations';
import { fetchAPI } from './fetchAPI';
import { resources } from './shared';

const operations = getCrudOperations(resources.BOOKS);

export async function createBook(data) {
    return await operations.create(data);
}
export async function giveBookToReader(bookID, readerID, departmentID) {
    return await fetchAPI('post', resources.READERS, {
        id: bookID,
        endpoint: `give-to-reader/${readerID}`,
        data: { departmentID },
    });
}

export async function queryBooks(
    queryParams,
    pageSize = null,
    pageNumber = null,
) {
    return await operations.query(queryParams, pageSize, pageNumber);
}

export async function getBookByID(id) {
    return operations.getData(id);
}

export async function getBookAmountDetails(id) {
    const totalAmountResponse = await operations.getData(id, 'total-amount');
    const givenAmountResponse = await operations.getData(id, 'given-amount');

    if (!totalAmountResponse.ok) return totalAmountResponse;
    if (!givenAmountResponse.ok) return givenAmountResponse;

    return {
        ok: true,
        data: { ...totalAmountResponse.data, ...givenAmountResponse.data },
    };
}

export async function getBookAuthors(id) {
    return await operations.getData(id, 'authors');
}

export async function getAmountDetailsInDepartments(id) {
    return await operations.getData(id, 'amount-details-in-departments');
}

export async function getAmountDetailsInSingleDepartment(bookID, departmentID) {
    return await operations.getData(
        bookID,
        `amount-details-in-departments/${departmentID}`,
    );
}

export async function updateBook(id, data) {
    return await operations.update(id, data);
}

export async function deleteBook(id) {
    return await operations.delete(id);
}
