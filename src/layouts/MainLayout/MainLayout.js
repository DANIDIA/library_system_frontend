import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { paths } from '../../shared';

export function MainLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <button onClick={() => navigate(paths.MY_DEPARTMENT)}>
                    My Department
                </button>
                <button onClick={() => navigate(paths.DEPARTMENTS_BASE)}>
                    Departments base
                </button>
                <button onClick={() => navigate(paths.MANAGERS_BASE)}>
                    Managers base
                </button>
                <button onClick={() => navigate(paths.LIBRARIAN_BASE)}>
                    Librarian base
                </button>
                <button onClick={() => navigate(paths.READERS_BASE)}>
                    Readers base
                </button>
                <button onClick={() => navigate(paths.BOOKS_BASE)}>
                    Books base
                </button>
            </nav>
            {outlet}
        </div>
    );
}
