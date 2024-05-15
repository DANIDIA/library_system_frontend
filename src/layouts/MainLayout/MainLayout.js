import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';

export function MainLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <button onClick={() => navigate('/my_department')}>
                    My Department
                </button>
                <button onClick={() => navigate('/departments_base')}>
                    Departments base
                </button>
                <button onClick={() => navigate('/managers_base')}>
                    Managers base
                </button>
                <button onClick={() => navigate('/librarian_base')}>
                    Librarian base
                </button>
                <button onClick={() => navigate('/readers_base')}>
                    Readers base
                </button>
                <button onClick={() => navigate('/books_base')}>
                    Books base
                </button>
            </nav>
            {outlet}
        </div>
    );
}
