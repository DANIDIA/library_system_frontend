import * as React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import LoginPage from '../loginPage/LoginPage';
import {Librarian} from '../librarian/Librarian';
import {Manager} from '../manager/Manager';
import {Administrator} from '../administrator/Administrator';
import {Books} from '../booksBase/Books';
import {Readers} from '../readersBase/Readers';
import {Librarians} from '../librariansBase/Librarians';
import {Users} from '../usersBase/Users';
import {Departments} from '../departmentBase/Departments';
import {MyDepartment} from '../manager/MyDepartment';

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='librarian-panel' element={<Librarian/>}>
                <Route path='books-base' element={<Books/>}/>
                <Route path='readers-base' element={<Readers/>}/>
            </Route>
            <Route path='department-manager-panel' element={<Manager/>}>
                <Route path='books-base' element={<Books/>}/>
                <Route path='readers-base' element={<Readers/>}/>
                <Route path='librarian-base' element={<Librarians/>}/>
                <Route path='my-department' element={<MyDepartment/>}/>
            </Route>
            <Route path='administrator-panel' element={<Administrator/>}>
                <Route path='books-base' element={<Books/>}/>
                <Route path='readers-base' element={<Readers/>}/>
                <Route path='users-base' element={<Users/>}/>
                <Route path='departmnet-base' element={<Departments/>}/>
            </Route>
        </Route>
    )
);

export default Router;
