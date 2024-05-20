import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartmentFormView } from '../components';

export function DepartmentSearchView() {
    const navigate = useNavigate();
    const handleSearch = () => {};

    return (
        <div>
            <DepartmentFormView
                submitButtonText='search'
                formSubmitHandler={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>Department name</th>
                        <th>Address</th>
                        <th>Contact number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => navigate('../page/1')}>
                        <td>Test name</td>
                        <td>Test address</td>
                        <td>Test contact number</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
