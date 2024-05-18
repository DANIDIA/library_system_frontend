import { basesPaths } from './basesPaths.enum';

export const adminLinks = {
    [basesPaths.DEPARTMENTS_BASE]: 'department base',
    [basesPaths.MANAGERS_BASE]: 'manager base',
    [basesPaths.LIBRARIAN_BASE]: 'librarian base',
    [basesPaths.READERS_BASE]: 'readers base',
    [basesPaths.BOOKS_BASE]: 'books base',
};

export const managerLinks = {
    [basesPaths.MY_DEPARTMENT]: 'my department',
    [basesPaths.LIBRARIAN_BASE]: 'librarian base',
    [basesPaths.READERS_BASE]: 'readers base',
    [basesPaths.BOOKS_BASE]: 'books base',
};

export const librarianLinks = {
    [basesPaths.MY_DEPARTMENT]: 'my department',
    [basesPaths.READERS_BASE]: 'readers base',
    [basesPaths.BOOKS_BASE]: 'books base',
};
