import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { pathsInPanel } from '../../shared';
import { ManagerContextProvider } from '../ManagerContext';

export function ManagerPanelView() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    return (
        <ManagerContextProvider>
            <div>
                <button onClick={() => navigate(pathsInPanel.CREATION)}>
                    Add manager
                </button>
                <button onClick={() => navigate(pathsInPanel.SEARCH)}>
                    Find managers
                </button>
                {outlet}
            </div>
        </ManagerContextProvider>
    );
}
