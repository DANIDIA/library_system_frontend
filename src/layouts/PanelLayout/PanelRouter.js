import React from 'react';
import { Route } from 'react-router-dom';
import { PanelLayout } from './PanelLayout';
import { basesPaths } from './shared';

export const PanelRouter = (
    <Route path={basesPaths.USER_PANEL} element={<PanelLayout />}></Route>
);
