import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { basesPaths } from './shared';

export function PanelLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <button onClick={() => navigate(basesPaths.MY_DEPARTMENT)}>
                    My Department
                </button>
                <button onClick={() => navigate(basesPaths.DEPARTMENTS_BASE)}>
                    Departments base
                </button>
                <button onClick={() => navigate(basesPaths.MANAGERS_BASE)}>
                    Managers base
                </button>
                <button onClick={() => navigate(basesPaths.LIBRARIAN_BASE)}>
                    Librarian base
                </button>
                <button onClick={() => navigate(basesPaths.READERS_BASE)}>
                    Readers base
                </button>
                <button onClick={() => navigate(basesPaths.BOOKS_BASE)}>
                    Books base
                </button>
            </nav>
            {outlet}
        </div>
    );
}
