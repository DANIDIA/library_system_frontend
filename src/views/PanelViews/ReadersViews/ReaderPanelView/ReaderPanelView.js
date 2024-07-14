import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { pathsInPanel } from '../../shared';
import { ReaderContextProvider } from '../ReaderContext';

export function ReaderPanelView() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        <div>
            <ReaderContextProvider>
                <button onClick={() => navigate(`./${pathsInPanel.CREATION}`)}>
                    Create reader
                </button>
                <button onClick={() => navigate(`./${pathsInPanel.SEARCH}`)}>
                    Search reader
                </button>
                {outlet}
            </ReaderContextProvider>
        </div>
    );
}
