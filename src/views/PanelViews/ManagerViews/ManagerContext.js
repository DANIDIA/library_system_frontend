import React, { createContext, useState } from 'react';

export const managerContext = createContext({
    managerData: null,
    setManagerData: () => {},
});

export function ManagerContextProvider({ children }) {
    const [managerData, setManagerData] = useState(null);

    return (
        <managerContext.Provider value={{ managerData, setManagerData }}>
            {children}
        </managerContext.Provider>
    );
}
