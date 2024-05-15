import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { SessionContextProvider } from './contexts';
import Router from './router/Router';

export function App() {
    return (
        <SessionContextProvider>
            <RouterProvider router={Router} />
        </SessionContextProvider>
    );
}

export default App;
