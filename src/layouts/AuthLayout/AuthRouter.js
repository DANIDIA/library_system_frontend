import React from 'react';
import { Route } from 'react-router-dom';
import { LoginView } from '../../views';
import { layoutsPaths } from '../shared';
import { AuthLayout } from './AuthLayout';

export const AuthRouter = (
    <Route path='/' element={<AuthLayout />}>
        <Route path={layoutsPaths.LOGIN_PAGE} element={<LoginView />} />
    </Route>
);
