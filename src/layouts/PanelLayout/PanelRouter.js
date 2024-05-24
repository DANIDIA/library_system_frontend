import React from 'react';
import { Route } from 'react-router-dom';
import {
    DepartmentCreationView,
    DepartmentEditView,
    DepartmentListView,
    DepartmentPanelView,
    DepartmentSingleView,
    ManagerPanelView,
    pathsInPanel,
} from '../../views';
import { layoutsPaths } from '../shared';
import { PanelLayout } from './PanelLayout';
import { panelsPaths } from './shared';

export const PanelRouter = (
    <Route path={layoutsPaths.USER_PANEL} element={<PanelLayout />}>
        <Route path={panelsPaths.DEPARTMENTS_PANEL} element={<DepartmentPanelView />}>
            <Route path={pathsInPanel.CREATION} element={<DepartmentCreationView />} />
            <Route path={pathsInPanel.SEARCH} element={<DepartmentListView />} />
            <Route path={pathsInPanel.PAGE} element={<DepartmentSingleView />}>
                <Route path={pathsInPanel.UPDATE} element={<DepartmentEditView />} />
            </Route>
        </Route>
        <Route path={panelsPaths.MANAGERS_PANEL} element={<ManagerPanelView />} />
    </Route>
);
