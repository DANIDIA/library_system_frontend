import * as React from 'react';

export const DepartmentSearch = () => {
    return (
        <div>
            <form>
                <label>Address</label>
                <input type='text' />
                <label>Name</label>
                <input type='text' />
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Workers amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a href='./Department.js'>Name</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
