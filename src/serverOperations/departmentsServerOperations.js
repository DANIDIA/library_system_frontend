import { bases } from '../enums';
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
} from './crudOperations';

export function departmentsServerOperations(sessionID) {
    return {
        createDepartment: async (
            name,
            address,
            contactNumber,
            actualManager = null,
        ) => {
            actualManager = actualManager ? actualManager : undefined;
            const params = { name, address, contactNumber, actualManager };

            return await createRecord(bases.DEPARTMENTS, params, sessionID);
        },

        /**
         * @param params {{ name?:string, address?:string, contactNumber?:string }}
         * @param fromRecordID {number} -1 means that start from the least id
         * @param recordAmount {number} -1 means maximum
         * @return {Promise<{
         * id:number,
         * name:string
         * address:string
         * contactNumber:string
         * actualManagerID:number} |
         * boolean |
         * {
         *  staus:number
         *  message:string}>}
         * */
        getDepartments: async (
            params,
            fromRecordID = -1,
            recordAmount = -1,
        ) => {
            return await getRecords(
                bases.DEPARTMENTS,
                fromRecordID,
                recordAmount,
                params,
                sessionID,
            );
        },

        /**
         * @param id {number}
         * @param params {{ name?:string, address?:string, contactNumber?:string }}
         * */
        updateDepartment: async (id, params) => {
            return await updateRecord(bases.DEPARTMENTS, id, params, sessionID);
        },

        deleteDepartment: async (id) => {
            return await deleteRecord(bases.DEPARTMENTS, id, sessionID);
        },
    };
}
