import { fetchAPI } from './fetchAPI';

export async function createDepartment(sessionID, data) {
    return await fetchAPI(sessionID, 'post', 'departments/add', data);
}
