import * as React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import LoginPage from '../loginPage/LoginPage';

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<LoginPage/>}>

        </Route>
    )
);

export default Router;
