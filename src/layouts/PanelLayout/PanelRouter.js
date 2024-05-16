import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { PanelLayout } from './PanelLayout';
import { panelPaths } from './shared';

export const PanelRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path={panelPaths.USER_PANEL} element={<PanelLayout />}></Route>,
    ),
);
