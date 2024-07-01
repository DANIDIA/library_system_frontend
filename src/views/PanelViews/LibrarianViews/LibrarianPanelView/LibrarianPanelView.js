import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { pathsInPanel } from '../../shared';

export function LibrarianPanelView() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        outlet || (
            <div>
                <button onClick={() => navigate(`./${pathsInPanel.CREATION}`)}>
                    create librarian
                </button>
                <button onClick={() => navigate(`./${pathsInPanel.SEARCH}`)}>
                    Search librarians
                </button>
            </div>
        )
    );
}
