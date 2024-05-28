import React, { createContext, useState } from 'react';

export const DepartmentSelectionContext = createContext({
    selectedDepartmentData: {},
    setSelectedDepartmentData: () => {},
    isRedirectedToTakeData: false,
});

export function DepartmentSelectionContextProvider({ children }) {
    const [selectedDepartmentData, setSelectedDepartmentData] = useState({});
    const [isRedirectedToTakeData, setIsRedirectedToTakeData] = useState(false);

    return (
        <DepartmentSelectionContext.Provider
            value={{
                selectedDepartmentData,
                setSelectedDepartmentData,
                isRedirectedToTakeData,
                setIsRedirectedToTakeData,
            }}
        >
            {children}
        </DepartmentSelectionContext.Provider>
    );
}
