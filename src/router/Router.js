import * as React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { AuthLayout, MainLayout } from '../layouts';
import { paths } from '../shared';
import { LoginView } from '../views';

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='/' element={<AuthLayout />}>
                <Route path={paths.LOGIN} element={<LoginView />} />
            </Route>
            <Route path={paths.USER_PANEL} element={<MainLayout />}></Route>
        </Route>,
    ),
);

export default Router;
