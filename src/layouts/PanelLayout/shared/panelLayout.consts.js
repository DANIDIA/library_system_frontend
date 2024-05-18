import { basesPaths } from './basesPaths.enum';

export const adminLinks = {
    'department base': basesPaths.DEPARTMENTS_BASE,
    'manager base': basesPaths.MANAGERS_BASE,
    'librarian base': basesPaths.LIBRARIAN_BASE,
    'readers base': basesPaths.READERS_BASE,
    'books base': basesPaths.BOOKS_BASE,
};

export const managerLinks = {
    'my department': basesPaths.MY_DEPARTMENT,
    'librarian base': basesPaths.LIBRARIAN_BASE,
    'readers base': basesPaths.READERS_BASE,
    'books base': basesPaths.BOOKS_BASE,
};

export const librarianLinks = {
    'my department': basesPaths.MY_DEPARTMENT,
    'readers base': basesPaths.READERS_BASE,
    'books base': basesPaths.BOOKS_BASE,
};
