import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartmentFormView } from '../components';
import { departmentPaths } from '../shared';

export function DepartmentListView() {
    const navigate = useNavigate();

    return (
        <div>
            <DepartmentFormView submitButtonText='search' />
            <table>
                <thead>
                    <tr>
                        <th>Department name</th>
                        <th>Address</th>
                        <th>Contact number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        onClick={() => navigate(`../${departmentPaths.PAGE}/1`)}
                    >
                        <td>Test name</td>
                        <td>Test address</td>
                        <td>Test contact number</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
