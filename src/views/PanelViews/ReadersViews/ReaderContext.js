import { createContext, useState } from 'react';

export const ReaderContext = createContext({
    readerData: {},
    setReaderData: () => {},
});

export function ReaderContextProvider({ children }) {
    const [readerData, setReaderData] = useState(null);

    return (
        <ReaderContext.Provider value={{ readerData, setReaderData }}>
            {children}
        </ReaderContext.Provider>
    );
}
