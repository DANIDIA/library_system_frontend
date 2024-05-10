import { fetchFromBase } from './fetchFromBase';

export async function createRecord(base, data, sessionID) {
    return await fetchFromBase(`${base}/add`, { ...data, sessionID }, 'post');
}

export async function getRecords(
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

export async function updateRecord(base, id, params, sessionID) {
    return await fetchFromBase(
        `${base}/update`,
        { id, ...params, sessionID },
        'put',
    );
}

export async function deleteRecord(base, id, sessionID) {
    return await fetchFromBase(`${base}/remove`, { id, sessionID }, 'delete');
}
