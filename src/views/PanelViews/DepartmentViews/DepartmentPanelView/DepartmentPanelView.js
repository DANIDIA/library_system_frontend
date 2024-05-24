import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { pathsInPanel } from '../../shared';
import { DepartmentContextProvider } from '../DepartmentContext';

export function DepartmentPanelView() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    return (
        <DepartmentContextProvider>
            <div>
                <button onClick={() => navigate(pathsInPanel.CREATION)}>
                    Create department
                </button>
                <button onClick={() => navigate(pathsInPanel.SEARCH)}>
                    Find departments
                </button>
                {outlet}
            </div>
        </DepartmentContextProvider>
    );
}
