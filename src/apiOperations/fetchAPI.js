import { SERVER_PATH } from '../shared';

export async function fetchAPI(method, endpointPath, { id = null, data = {} }) {
    let url = `${SERVER_PATH}/api/${endpointPath}/` + id || '';
    const config = { method };

    if (method === 'get') {
        url += '?' + new URLSearchParams({ ...data }).toString();
    } else {
        config.body = JSON.stringify({ ...data });
        config.headers = { 'Content-Type': 'application/json' };
    }

    const response = await fetch(url, config).catch(() => {});

    if (!response?.ok) {
        return {
            ok: false,
            status: response?.status,
            message: response?.statusText,
        };
    }

    const responseData = await response.json();

    return { ok: true, data: responseData };
}
