import React, { createContext, useState } from 'react';

export const managerContext = createContext({
    managerData: {},
    setManagerData: () => {},
});

export function ManagerContextProvider({ children }) {
    const [managerData, setManagerData] = useState();

    return (
        <managerContext.Provider value={{ managerData, setManagerData }}>
            {children}
        </managerContext.Provider>
    );
}
