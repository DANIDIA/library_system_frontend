import { bases } from '../enums';
import { createRecord, getRecords, updateRecord } from './crudOperations';
import { fetchFromBase } from './fetchFromBase';

export function usersServerOperations(sessionID) {
    return {
        createUser: async (
            name,
            surname,
            phoneNumber,
            role,
            departmentID,
            email = '',
        ) => {
            email = email ? email : undefined;
            const params = {
                name,
                surname,
                phoneNumber,
                role,
                departmentID,
                email,
            };

            return await createRecord(bases.USERS, params, sessionID);
        },

        /**
         * @param params {{ name?:string, surname?:string, phoneNumber?:string, email?:string, departmentID:number, role:number }}
         * @param fromRecordID {number} -1 means that start from the least id
         * @param recordAmount {number} -1 means maximum
         * @return {Promise<{
         * id:number,
         * name:string
         * surname:string
         * phoneNumber:string
         * email:string
         * role:number
         * departmentID:number} |
         * boolean |
         * {
         *  staus:number
         *  message:string}>}
         * */
        getUsers: async (params, fromRecordID = -1, recordAmount = -1) => {
            return await getRecords(
                bases.USERS,
                fromRecordID,
                recordAmount,
                params,
                sessionID,
            );
        },

        /**
         * @param id {number}
         * @param params {{ name?:string, surname?:string, phoneNumber?:string, email?:string, departmentID:number, role:number }}
         * */
        updateUser: async (id, params) => {
            return await updateRecord(bases.USERS, id, params, sessionID);
        },

        changeUserStatus: async (id, status) => {
            return await fetchFromBase(
                `${bases.USERS}/change_status`,
                { isActive: status },
                'put',
            );
        },
    };
}
