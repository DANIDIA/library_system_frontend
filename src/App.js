import React from 'react';
import Router from './router/Router';
import {RouterProvider} from 'react-router-dom';

export function App() {
    return (
        <RouterProvider router={Router}/>
    );
}

export default App;
