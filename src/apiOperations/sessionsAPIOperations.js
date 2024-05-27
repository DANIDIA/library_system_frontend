import { SERVER_PATH } from '../shared';

export async function newSession(login, password) {
    const endPoint = SERVER_PATH + '/sessions/login';
    let failedToFetch = false;

    const response = await fetch(endPoint, {
        method: 'post',
        body: JSON.stringify({ login, password }),
        headers: { 'Content-type': 'application/json' },
    }).catch(() => {
        failedToFetch = true;
    });

    if (failedToFetch) {
        return false;
    }

    if (response.ok) {
        return await response.json();
    }

    return { status: response.status, message: response.statusText };
}
