import React, { createContext, useState } from 'react';

export const SessionContext = createContext({
    setSessionID: () => {},
    sessionID: null,
});

export function SessionContextProvider({ children }) {
    const [sessionID, setSessionID] = useState(null);

    return (
        <SessionContext.Provider value={{ sessionID, setSessionID }}>
            {children}
        </SessionContext.Provider>
    );
}
