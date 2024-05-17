import React, { createContext, useState } from 'react';

export const SessionContext = createContext({
    setUserData: () => {},
    userData: {},
});

export function SessionContextProvider({ children }) {
    const [userData, setUserData] = useState();

    return (
        <SessionContext.Provider value={{ setUserData, userData }}>
            {children}
        </SessionContext.Provider>
    );
}
