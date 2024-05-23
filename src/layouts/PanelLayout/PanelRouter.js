import React from 'react';
import { Route } from 'react-router-dom';
import {
    DepartmentCreationView,
    DepartmentEditView,
    DepartmentListView,
    DepartmentPanelView,
    DepartmentSingleView,
    departmentPaths,
} from '../../views';
import { layoutsPaths } from '../shared';
import { PanelLayout } from './PanelLayout';
import { panelsPaths } from './shared';

export const PanelRouter = (
    <Route path={layoutsPaths.USER_PANEL} element={<PanelLayout />}>
        <Route
            path={panelsPaths.DEPARTMENTS_PANEL}
            element={<DepartmentPanelView />}
        >
            <Route
                path={departmentPaths.CREATION}
                element={<DepartmentCreationView />}
            />
            <Route
                path={departmentPaths.SEARCH}
                element={<DepartmentListView />}
            />
            <Route
                path={`${departmentPaths.PAGE}`}
                element={<DepartmentSingleView />}
            >
                <Route
                    path={departmentPaths.UPDATE}
                    element={<DepartmentEditView />}
                />
            </Route>
        </Route>
    </Route>
);
