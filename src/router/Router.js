import * as React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { AuthLayout, MainLayout } from '../layouts';
import { LoginView } from '../views';

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='/' element={<AuthLayout />}>
                <Route path='login' element={<LoginView />} />
            </Route>
            <Route path='/user_panel' element={<MainLayout />}></Route>
        </Route>,
    ),
);

export default Router;
