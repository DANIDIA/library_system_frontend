import { getCrudOperations } from './crudOperations';
import { fetchAPI } from './fetchAPI';
import { resources } from './shared';

const operations = getCrudOperations(resources.READERS);

export async function createReader(data) {
    return await operations.create(data);
}

export async function returnReaderBook(readerID, bookID) {
    return await fetchAPI('post', `api/${resources.READERS}/${readerID}`, {
        id: bookID,
        endpoint: 'return-book',
    });
}

export async function queryReaders(queryParams, pageSize = null, pageNumber) {
    return await operations.query(queryParams, pageSize, pageNumber);
}

export async function getReader(id) {
    return await operations.getData(id);
}

export async function getReaderBooks(id) {
    return await operations.getData(id, 'given-books');
}

export async function updateReader(id, data) {
    return await operations.update(id, data);
}

export async function deleteReader(id) {
    return await operations.delete(id);
}
