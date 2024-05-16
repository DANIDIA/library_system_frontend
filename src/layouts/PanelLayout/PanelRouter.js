import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { paths } from '../../shared';
import { PanelLayout } from './PanelLayout';

export const PanelRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path={paths.USER_PANEL} element={<PanelLayout />}></Route>,
    ),
);
