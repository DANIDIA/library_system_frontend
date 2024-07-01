import React, { createContext, useState } from 'react';

export const LibrarianContext = createContext({
    librarianData: {},
    setLibrarianData: () => {},
});

export function LibrarianContextProvider({ children }) {
    const [librarianData, setLibrarianData] = useState({});

    return (
        <LibrarianContext.Provider value={{ librarianData, setLibrarianData }}>
            {children}
        </LibrarianContext.Provider>
    );
}
