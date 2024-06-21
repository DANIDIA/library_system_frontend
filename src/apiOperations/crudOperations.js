import { fetchAPI } from './fetchAPI';

export const getCrudOperations = (resource) => ({
    create: async (data) => await fetchAPI('post', `${resource}`, { data }),

    query: async (query) =>
        await fetchAPI('get', `${resource}`, { data: query }),

    getData: async (resourceID, resourceData = '') =>
        await fetchAPI('get', `${resource}/${resourceData}`, {
            id: resourceID,
        }),

    update: async (resourceID, data) =>
        await fetchAPI('put', `${resource}`, {
            id: resourceID,
            data,
        }),

    delete: async (resourceID) =>
        await fetchAPI('delete', `${resource}`, {
            id: resourceID,
        }),
});
