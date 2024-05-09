import { bases } from '../enums';
import { create, deleteRecord, getData, update } from './CRUDOperations';
import { fetchFromBase } from './fetchFromBase';

export async function createBook(title, author, amount) {
    await create(bases.BOOKS, { title, author, amount });
}

/**
 * @param params {{ title?:string, author?:string, amount?:number }}
 * @param fromRecordID {number} -1 means that start from the least id
 * @param recordAmount {number} -1 means maximum
 * */
export async function getBooks(params, fromRecordID = -1, recordAmount = -1) {
    return await getData(bases.BOOKS, fromRecordID, recordAmount, params);
}

/**
 * @param id {number}
 * @param params {{ title?:string, author:string, amount?:string }}
 * */
export async function updateBook(id, params) {
    await update(bases.BOOKS, id, params);
}

export async function deleteBook(id) {
    await deleteRecord(bases.BOOKS, id);
}

export async function getGivenAmount(id) {
    return await fetchFromBase(`${bases.BOOKS}/given_amount`, { id });
}

export async function giveToReader(bookID, readerID) {
    return await fetchFromBase(
        `${bases.BOOKS}/give_to_reader`,
        {
            bookID,
            readerID,
        },
        'post',
    );
}
