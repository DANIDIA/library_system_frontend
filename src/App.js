import React from 'react';
import { RouterProvider } from 'react-router-dom';
import GlobalRouter from './GlobalRouter';
import { SessionContextProvider } from './contexts';

export function App() {
    return (
        <SessionContextProvider>
            <RouterProvider router={GlobalRouter} />
        </SessionContextProvider>
    );
}

export default App;
