import { SERVER_PATH } from '../shared';

export async function fetchAPI(sessionID, method, endpointPath, data) {
    let path = `${SERVER_PATH}/${endpointPath}`;
    const config = { method };

    if (method === 'get') {
        path += '?' + new URLSearchParams({ ...data, sessionID }).toString();
    } else {
        config.body = JSON.stringify({ ...data, sessionID });
        config.headers = { 'Content-Type': 'application/json' };
    }

    const response = await fetch(path, config).catch(() => {});

    if (!response?.ok) {
        return {
            ok: false,
            status: response?.status,
            message: response?.statusText,
        };
    }

    const responseData = await response.json().catch(() => {});

    return { ok: true, data: responseData };
}