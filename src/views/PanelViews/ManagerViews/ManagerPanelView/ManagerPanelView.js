import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { pathsInPanel } from '../../shared';

export function ManagerPanelView() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    return (
        <div>
            <button onClick={() => navigate(pathsInPanel.CREATION)}>
                Add manager
            </button>
            <button onClick={() => navigate(pathsInPanel.SEARCH)}>
                Find managers
            </button>
            {outlet}
        </div>
    );
}
