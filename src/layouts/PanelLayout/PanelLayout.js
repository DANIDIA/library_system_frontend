import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { panelPaths } from './shared';

export function PanelLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <button onClick={() => navigate(panelPaths.MY_DEPARTMENT)}>
                    My Department
                </button>
                <button onClick={() => navigate(panelPaths.DEPARTMENTS_BASE)}>
                    Departments base
                </button>
                <button onClick={() => navigate(panelPaths.MANAGERS_BASE)}>
                    Managers base
                </button>
                <button onClick={() => navigate(panelPaths.LIBRARIAN_BASE)}>
                    Librarian base
                </button>
                <button onClick={() => navigate(panelPaths.READERS_BASE)}>
                    Readers base
                </button>
                <button onClick={() => navigate(panelPaths.BOOKS_BASE)}>
                    Books base
                </button>
            </nav>
            {outlet}
        </div>
    );
}
