import { panelsPaths } from './panelsPaths.enum';

export const adminLinks = {
    [panelsPaths.DEPARTMENTS_PANEL]: 'department base',
    [panelsPaths.MANAGERS_PANEL]: 'manager base',
    [panelsPaths.LIBRARIAN_PANEL]: 'librarian base',
    [panelsPaths.READERS_PANEL]: 'readers base',
    [panelsPaths.BOOKS_PANEL]: 'books base',
};

export const managerLinks = {
    [panelsPaths.MY_DEPARTMENT]: 'my department',
    [panelsPaths.LIBRARIAN_PANEL]: 'librarian base',
    [panelsPaths.READERS_PANEL]: 'readers base',
    [panelsPaths.BOOKS_PANEL]: 'books base',
};

export const librarianLinks = {
    [panelsPaths.MY_DEPARTMENT]: 'my department',
    [panelsPaths.READERS_PANEL]: 'readers base',
    [panelsPaths.BOOKS_PANEL]: 'books base',
};
