import React from 'react';
import { RouterProvider } from 'react-router-dom';
import MainRouter from './MainRouter';
import { SessionContextProvider } from './contexts';

export function App() {
    return (
        <SessionContextProvider>
            <RouterProvider router={MainRouter} />
        </SessionContextProvider>
    );
}

export default App;
