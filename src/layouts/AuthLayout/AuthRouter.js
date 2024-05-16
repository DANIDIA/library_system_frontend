import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { paths } from '../../shared';
import { LoginView } from '../../views';
import { AuthLayout } from './AuthLayout';

export const AuthRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<AuthLayout />}>
            <Route path={paths.LOGIN} element={<LoginView />} />
        </Route>,
    ),
);
