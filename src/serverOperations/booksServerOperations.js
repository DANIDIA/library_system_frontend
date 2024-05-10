import { bases } from '../enums';
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
} from './crudOperations';
import { fetchFromBase } from './fetchFromBase';

export function getBookServerOperations(sessionID) {
    return {
        createBook: async (title, author, amount) => {
            return await createRecord(
                bases.BOOKS,
                { title, author, amount },
                sessionID,
            );
        },

        /**
         * @param params {{ title?:string, author?:string, amount?:number }}
         * @param fromRecordID {number} -1 means that start from the least id
         * @param recordAmount {number} -1 means maximum
         * @return {Promise<{
         * id:number,
         * title:string
         * author:string
         * amount:number} |
         * boolean |
         * {
         *  staus:number
         *  message:string}>}
         * */
        getBooks: async (params, fromRecordID = -1, recordAmount = -1) => {
            return await getRecords(
                bases.BOOKS,
                fromRecordID,
                recordAmount,
                params,
                sessionID,
            );
        },

        /**
         * @param id {number}
         * @param params {{ title?:string, author:string, amount?:string }}
         * */
        updateBook: async (id, params) => {
            return await updateRecord(bases.BOOKS, id, params, sessionID);
        },

        deleteBook: async (id) => {
            return await deleteRecord(bases.BOOKS, id, sessionID);
        },

        getGivenAmount: async (id) => {
            return await fetchFromBase(`${bases.BOOKS}/given_amount`, {
                id,
                sessionID,
            });
        },

        giveToReader: async (bookID, readerID) => {
            return await fetchFromBase(
                `${bases.BOOKS}/give_to_reader`,
                {
                    bookID,
                    readerID,
                    sessionID,
                },
                'post',
            );
        },
    };
}
