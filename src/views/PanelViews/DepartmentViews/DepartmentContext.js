import React, { createContext, useContext, useState } from 'react';

export const DepartmentContext = createContext({
    departmentData: {},
    setDepartmentData: () => {},
});

export function DepartmentContextProvider({ children }) {
    const [departmentData, setDepartmentData] = useState();

    return (
        <DepartmentContext.Provider
            value={{ departmentData, setDepartmentData }}
        >
            {children}
        </DepartmentContext.Provider>
    );
}
