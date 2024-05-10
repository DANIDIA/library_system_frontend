import { bases } from '../enums';
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
} from './crudOperations';
import { fetchFromBase } from './fetchFromBase';

export function getReadersServerOperations(sessionID) {
    return {
        createReader: async (name, surname, phoneNumber, email = '') => {
            email = email ? email : undefined;
            const params = { name, surname, phoneNumber, email };

            return await createRecord(bases.READERS, params, sessionID);
        },

        /**
         * @param params {{ id?:number, name?:string, surname?:string, phoneNumber?:string, email?:string }}
         * @param fromRecordID {number} -1 means that start from the least id
         * @param recordAmount {number} -1 means maximum
         * @return {Promise<{
         * id:number,
         * name:string
         * surname:string
         * phoneNumber:string
         * email:string} |
         * boolean |
         * {
         *  staus:number
         *  message:string}>}
         * */
        getReader: async (params, fromRecordID = -1, recordAmount = -1) => {
            return await getRecords(
                bases.READERS,
                fromRecordID,
                recordAmount,
                params,
                sessionID,
            );
        },

        /**
         * @param id {number}
         * @param params {{ id?:number, name?:string, surname?:string, phoneNumber?:string, email?:string }}
         * */
        updateReader: async (id, params) => {
            return await updateRecord(bases.READERS, id, params, sessionID);
        },

        deleteReader: async (id) => {
            return await deleteRecord(bases.READERS, id, sessionID);
        },

        changeReaderStatus: async (id, status) => {
            return await fetchFromBase(
                `${bases.READERS}/change_status`,
                { isActive: status },
                'put',
            );
        },

        returnReadersBook: async (readerID, bookID) => {
            return await fetchFromBase(
                `${bases.READERS}/return_book`,
                { id: readerID, bookID },
                'post',
            );
        },
    };
}
