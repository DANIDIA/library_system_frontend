import React from 'react';
import { Route } from 'react-router-dom';
import { DepartmentBaseView } from '../../views';
import { layoutsPaths } from '../shared';
import { PanelLayout } from './PanelLayout';
import { basesPaths } from './shared';

export const PanelRouter = (
    <Route path={layoutsPaths.USER_PANEL} element={<PanelLayout />}>
        <Route
            path={basesPaths.DEPARTMENTS_BASE}
            element={<DepartmentBaseView />}
        />
    </Route>
);
