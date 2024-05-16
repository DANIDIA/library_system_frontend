import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { LoginView } from '../../views';
import { AuthLayout } from './AuthLayout';
import { authPath } from './shared';

export const AuthRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<AuthLayout />}>
            <Route path={authPath.LOGIN} element={<LoginView />} />
        </Route>,
    ),
);
