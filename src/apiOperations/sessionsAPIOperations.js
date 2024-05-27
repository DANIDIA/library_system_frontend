import { fetchAPI } from './fetchAPI';

export async function newSession(login, password) {
    return fetchAPI(null, 'post', '/sessions/login', { login, password });
}
