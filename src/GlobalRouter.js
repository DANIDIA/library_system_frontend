import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { AuthRouter, PanelRouter } from './layouts';

export const GlobalRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            {AuthRouter}
            {PanelRouter}
        </Route>,
    ),
);

export default GlobalRouter;
