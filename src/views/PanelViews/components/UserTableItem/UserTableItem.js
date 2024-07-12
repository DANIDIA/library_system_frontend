import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathsInPanel } from '../../shared';

export function UserTableItem({ userData, onClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = () => {
        if (location.state) {
            navigate(location.state.pathToReturn, {
                state: { selectedData: userData },
            });
        } else {
            onClick(userData);
            navigate(`../${pathsInPanel.PAGE}/${userData.id}`);
        }
    };

    return (
        <tr onClick={handleItemClick}>
            <td>{userData.name}</td>
            <td>{userData.surname}</td>
            <td>{userData.phoneNumber}</td>
            <td>{userData.email}</td>
            <td>{userData.departmentID || 'no department'}</td>
            <td>{userData.status ? 'active' : 'blocked'}</td>
        </tr>
    );
}
