import React from 'react';
import { Route } from 'react-router-dom';
import {
    DepartmentBaseView,
    DepartmentCreationView,
    DepartmentEditView,
    DepartmentPageView,
    DepartmentSearchView,
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
            <Route path='creation' element={<DepartmentCreationView />} />
            <Route path='search' element={<DepartmentSearchView />} />
            <Route path='page/:departmentID' element={<DepartmentPageView />}>
                <Route path='update' element={<DepartmentEditView />} />
            </Route>
        </Route>
    </Route>
);
