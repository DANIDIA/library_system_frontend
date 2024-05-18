import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

export function DepartmentBaseView() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    return (
        <div>
            <button onClick={() => navigate('creation')}>
                Create department
            </button>
            <button>Find departments</button>
            {outlet}
        </div>
    );
}
