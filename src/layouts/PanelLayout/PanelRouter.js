import React from 'react';
import { Route } from 'react-router-dom';
import { PanelLayout } from './PanelLayout';
import { panelPaths } from './shared';

export const PanelRouter = (
    <Route path={panelPaths.USER_PANEL} element={<PanelLayout />}></Route>
);
