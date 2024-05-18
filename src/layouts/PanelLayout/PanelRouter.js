import React from 'react';
import { Route } from 'react-router-dom';
import { layoutsPaths } from '../shared';
import { PanelLayout } from './PanelLayout';

export const PanelRouter = (
    <Route path={layoutsPaths.USER_PANEL} element={<PanelLayout />}></Route>
);
