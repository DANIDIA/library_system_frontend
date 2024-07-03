import { SERVER_PATH } from '../shared';

export async function fetchAPI(
    method,
    resource,
    { id = null, endpoint = '', data = {} },
) {
    const getAsURLPart = (part) => (part ? `/${part}` : '');

    let url =
        `${SERVER_PATH}/${resource}` +
        getAsURLPart(id) +
        getAsURLPart(endpoint);
    const config = { method, credentials: 'include' };

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

    const responseData = await response.json().catch(() => {});

    return { ok: true, data: responseData };
}
