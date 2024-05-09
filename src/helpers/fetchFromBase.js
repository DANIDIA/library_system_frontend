import { SERVER_PATH } from '../constants';

export async function fetchFromBase(path, params, method = 'get') {
    method = method.toLowerCase();
    const config = { method };
    let URL = `${SERVER_PATH}/${path}`;

    if (method === 'get') {
        URL = `${URL}?${new URLSearchParams(params)}`;
    } else {
        config.headers = { contentType: 'application/json' };
        config.body = JSON.stringify(params);
    }

    let isFetchFailed = false;

    const response = await fetch(URL, config).catch(() => {
        isFetchFailed = true;
    });

    if (isFetchFailed) {
        return false;
    }

    if (response.ok) {
        return await response.json();
    }

    return { status: response.status, message: response.statusText };
}
