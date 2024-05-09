import { fetchFromBase } from './fetchFromBase';

export async function create(base, data) {
    return await fetchFromBase(`${base}/add`, data, 'post');
}

export async function getData(base, fromRecordID, recordAmount, params) {
    fromRecordID = fromRecordID > 0 ? fromRecordID : undefined;
    recordAmount = recordAmount > 0 ? recordAmount : undefined;

    const query = { ...params, fromRecordID, recordAmount };

    return fetchFromBase(`${base}/get`, query);
}

export async function update(base, id, params) {
    return await fetchFromBase(`${base}/update`, { id, ...params }, 'put');
}

export async function deleteRecord(base, id) {
    return await fetchFromBase(`${base}/remove`, { id }, 'delete');
}
