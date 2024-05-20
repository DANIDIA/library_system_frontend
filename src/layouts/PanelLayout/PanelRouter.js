import React from 'react';
import { Route } from 'react-router-dom';
import {
    DepartmentBaseView,
    DepartmentCreationView,
    DepartmentEditView,
    DepartmentListView,
    DepartmentSingleView,
    departmentPaths,
} from '../../views';
import { layoutsPaths } from '../shared';
import { PanelLayout } from './PanelLayout';
import { basesPaths } from './shared';

export const PanelRouter = (
    <Route path={layoutsPaths.USER_PANEL} element={<PanelLayout />}>
        <Route
            path={basesPaths.DEPARTMENTS_BASE}
            element={<DepartmentBaseView />}
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
                path={`${departmentPaths.PAGE}/:departmentID`}
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
