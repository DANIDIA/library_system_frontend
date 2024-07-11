import React, { createContext, useState } from 'react';

export const BookContext = createContext({
    bookData: {},
    setBookData: () => {},
});

export function BooksContextProvider({ children }) {
    const [bookData, setBookData] = useState(null);

    return (
        <BookContext.Provider value={(bookData, setBookData)}>
            {children}
        </BookContext.Provider>
    );
}
