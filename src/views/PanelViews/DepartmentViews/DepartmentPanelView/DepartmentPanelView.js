import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { DepartmentContextProvider } from '../DepartmentContext';
import { departmentPaths } from '../shared';

export function DepartmentPanelView() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    return (
        <DepartmentContextProvider>
            <div>
                <button onClick={() => navigate(departmentPaths.CREATION)}>
                    Create department
                </button>
                <button onClick={() => navigate(departmentPaths.SEARCH)}>
                    Find departments
                </button>
                {outlet}
            </div>
        </DepartmentContextProvider>
    );
}
