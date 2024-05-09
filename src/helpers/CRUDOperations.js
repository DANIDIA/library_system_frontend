import { fetchFromBase } from './fetchFromBase';

export async function create(base, data, sessionID) {
    return await fetchFromBase(`${base}/add`, { ...data, sessionID }, 'post');
}

export async function getData(
    base,
    fromRecordID,
    recordAmount,
    params,
    sessionID,
) {
    fromRecordID = fromRecordID > 0 ? fromRecordID : undefined;
    recordAmount = recordAmount > 0 ? recordAmount : undefined;

    const query = { ...params, sessionID, fromRecordID, recordAmount };

    return fetchFromBase(`${base}/get`, query);
}

export async function update(base, id, params, sessionID) {
    return await fetchFromBase(
        `${base}/update`,
        { id, ...params, sessionID },
        'put',
    );
}

export async function deleteRecord(base, id, sessionID) {
    return await fetchFromBase(`${base}/remove`, { id, sessionID }, 'delete');
}
