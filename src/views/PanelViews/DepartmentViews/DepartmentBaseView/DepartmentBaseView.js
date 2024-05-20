import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { departmentPaths } from '../shared';

export function DepartmentBaseView() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    return (
        <div>
            <button onClick={() => navigate(departmentPaths.CREATION)}>
                Create department
            </button>
            <button onClick={() => navigate(departmentPaths.SEARCH)}>
                Find departments
            </button>
            {outlet}
        </div>
    );
}
