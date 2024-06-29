import { fetchAPI } from './fetchAPI';

export async function startSession(login, password) {
    return await fetchAPI('post', 'auth', {
        data: { login, password },
    });
}

export async function endSession() {
    return await fetchAPI('delete', 'auth', {});
}
