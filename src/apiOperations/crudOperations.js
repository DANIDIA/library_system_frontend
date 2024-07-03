import { fetchAPI } from './fetchAPI';

export const getCrudOperations = (resource) => ({
    create: async (data) => await fetchAPI('post', `api/${resource}`, { data }),

    query: async (query, pageSize = null, pageNumber = null) => {
        return await fetchAPI('get', `api/${resource}`, {
            data:
                pageSize === null && pageNumber === null
                    ? { ...query }
                    : { ...query, pageSize, pageNumber },
        });
    },

    getData: async (resourceID, resourceData = '') =>
        await fetchAPI('get', `api/${resource}`, {
            id: resourceID,
            endpoint: resourceData,
        }),

    update: async (resourceID, data) =>
        await fetchAPI('put', `api/${resource}`, {
            id: resourceID,
            data,
        }),

    delete: async (resourceID) =>
        await fetchAPI('delete', `api/${resource}`, {
            id: resourceID,
        }),
});
