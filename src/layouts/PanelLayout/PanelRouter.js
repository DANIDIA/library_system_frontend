import React from 'react';
import { Route } from 'react-router-dom';
import {
    DepartmentCreationView,
    DepartmentEditView,
    DepartmentListView,
    DepartmentPanelView,
    DepartmentSingleView,
    ManagerCreationView,
    ManagerEditView,
    ManagerPanelView,
    ManagerSingleView,
    ManagersListView,
    pathsInPanel,
} from '../../views';
import {
    BookCreationView,
    BookEditView,
    BookListView,
    BookPanelView,
    BookSingleView,
} from '../../views/panelViews/BookViews';
import {
    LibrarianCreationView,
    LibrarianListView,
    LibrarianPanelView,
    LibrarianSingleView,
} from '../../views/panelViews/LibrarianViews';
import { LibrarianEditView } from '../../views/panelViews/LibrarianViews/LibrarianEditView';
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
                path={pathsInPanel.CREATION}
                element={<DepartmentCreationView />}
            />
            <Route
                path={pathsInPanel.SEARCH}
                element={<DepartmentListView />}
            />
            <Route path={pathsInPanel.PAGE} element={<DepartmentSingleView />}>
                <Route
                    path={pathsInPanel.UPDATE}
                    element={<DepartmentEditView />}
                />
            </Route>
        </Route>
        <Route path={panelsPaths.MANAGERS_PANEL} element={<ManagerPanelView />}>
            <Route
                path={pathsInPanel.CREATION}
                element={<ManagerCreationView />}
            />
            <Route path={pathsInPanel.SEARCH} element={<ManagersListView />} />
            <Route
                path={`${pathsInPanel.PAGE}/:managerID`}
                element={<ManagerSingleView />}
            />
            <Route
                path={`${pathsInPanel.UPDATE}/:managerID`}
                element={<ManagerEditView />}
            />
        </Route>
        <Route
            path={panelsPaths.LIBRARIAN_PANEL}
            element={<LibrarianPanelView />}
        >
            <Route
                path={pathsInPanel.CREATION}
                element={<LibrarianCreationView />}
            />
            <Route path={pathsInPanel.SEARCH} element={<LibrarianListView />} />
            <Route
                path={`${pathsInPanel.PAGE}/:librarianID`}
                element={<LibrarianSingleView />}
            />
            <Route
                path={`${pathsInPanel.UPDATE}/:librarianID`}
                element={<LibrarianEditView />}
            />
        </Route>
        <Route path={panelsPaths.BOOKS_PANEL} element={<BookPanelView />}>
            <Route
                path={pathsInPanel.CREATION}
                element={<BookCreationView />}
            />
            <Route path={pathsInPanel.SEARCH} element={<BookListView />} />
            <Route
                path={`${pathsInPanel.PAGE}/:bookID`}
                element={<BookSingleView />}
            />
            <Route
                path={`${pathsInPanel.UPDATE}/:bookID`}
                element={<BookEditView />}
            />
        </Route>
    </Route>
);
