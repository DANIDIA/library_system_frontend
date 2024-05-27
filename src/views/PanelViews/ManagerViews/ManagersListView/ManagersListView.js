import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pathsInPanel } from '../../shared';
import { ManagerFormComponent } from '../components';

export function ManagersListView() {
    const navigate = useNavigate();

    const table = (
        <table>
            <thead>
                <tr>
                    <th>Manager name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Login</th>
                    <th>Password</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={() => navigate(`../${pathsInPanel.PAGE}`)}>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                    <td>text</td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <div>
            <ManagerFormComponent submitButtonText='search managers' />
            {table}
        </div>
    );
}
