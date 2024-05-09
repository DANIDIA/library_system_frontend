import { SERVER_PATH } from '../constants';

export async function newSession(login, password) {
    //TODO: replace to constants
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
        const data = await response.json();
        return {
            status: response.status,
            sessionID: data.sessionID,
            userRole: data.role,
        };
    }

    return { status: response.status, message: response.statusText };
}
