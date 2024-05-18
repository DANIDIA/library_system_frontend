import React from 'react';
import { DepartmentFormView } from '../components';

export function DepartmentSearchView() {
    const handleSearch = () => {};

    return (
        <div>
            <DepartmentFormView
                buttonText='search'
                buttonClickHandler={handleSearch()}
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
                    <tr>
                        <td>Test name</td>
                        <td>Test address</td>
                        <td>Test contact number</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
