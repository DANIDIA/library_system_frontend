import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';

export function App() {
    return <RouterProvider router={Router} />;
}

export default App;
