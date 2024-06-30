import React from 'react';
import { UserTableItem } from '../UserTableItem';

export function UsersTable({ list }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Manager name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>departmentID</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {list?.map((data, index) => (
                    <UserTableItem userData={data} key={index} />
                ))}
            </tbody>
        </table>
    );
}
