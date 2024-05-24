import { fetchAPI } from './fetchAPI';

export const getCrudOperations = (apiPath) => ({
    create: async (sessionID, data) =>
        await fetchAPI(sessionID, 'post', `${apiPath}/add`, data),

    read: async (sessionID, query) =>
        await fetchAPI(sessionID, 'get', `${apiPath}/get`, query),

    update: async (sessionID, updatingObjectID, data) =>
        await fetchAPI(sessionID, 'put', `${apiPath}/update`, {
            ...data,
            id: updatingObjectID,
        }),

    delete: async (sessionID, deletingObjectID) =>
        await fetchAPI(sessionID, 'delete', `${apiPath}/remove`, {
            id: deletingObjectID,
        }),
});
