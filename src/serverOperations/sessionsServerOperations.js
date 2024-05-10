import { bases } from '../enums';
import { fetchFromBase } from './fetchFromBase';

/**
 * @return {Promise<{
 * id:number,
 * name:string,
 * surname:string,
 * role:number,
 * phoneNumber:string,
 * email:string,
 * isActive:number,
 * additionTime:string,
 * departmentID:string,
 * sessionID:number} |
 * boolean |
 * {
 *  staus:number
 *  message:string}>}
 * */
export async function newSession(login, password) {
    return await fetchFromBase(
        `${bases.SESSIONS}/login`,
        { login, password },
        'post',
    );
}

export async function endSession(id) {
    return await fetchFromBase(`${bases.SESSIONS}/logout`, { id }, 'put');
}

export async function isSessionEnded(id) {
    return await fetchFromBase(`${bases.SESSIONS}/is_session_ended`, { id });
}
