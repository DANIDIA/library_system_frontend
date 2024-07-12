import React from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { pathsInPanel } from '../../shared';
import { BooksContextProvider } from '../BookContext';

export function BookPanelView() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    return (
        <div>
            <BooksContextProvider>
                <button onClick={() => navigate(`./${pathsInPanel.CREATION}`)}>
                    Create book
                </button>
                <button onClick={() => navigate(`./${pathsInPanel.SEARCH}`)}>
                    Search books
                </button>
                {outlet}
            </BooksContextProvider>
        </div>
    );
}
